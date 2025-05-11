import { initiatePayment } from "../services/paymentService.js";
import appointmentModel from "../models/appointmentModel.js";

const createPayment = async (req, res) => {
  try {
    if (
      !req.headers.token ||
      !req.headers["content-type"]?.includes("application/json")
    ) {
      return res.status(400).json({
        success: false,
        message: "Required headers: token, Content-Type: application/json",
      });
    }

    // Verify body
    if (!req.body.appointmentId) {
      return res.status(400).json({
        success: false,
        message: "appointmentId is required in request body",
      });
    }

    const appointment = await appointmentModel
      .findById(req.body.appointmentId)
      .populate("userData", "name email phone")
      .populate("doctorData", "name fees");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const paymentResponse = await initiatePayment({
      appointmentId: appointment._id,
      amount: appointment.amount,
      doctorName: appointment.doctorData.name,
      patientName: appointment.userData.name,
      patientEmail: appointment.userData.email,
      patientPhone: appointment.userData.phone,
      token: req.headers.token, // Pass through
    });

    res.json({
      success: true,
      paymentUrl: paymentResponse.payment_url,
      token: req.headers.token, // Mirror back
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment initiation failed",
      token: req.headers.token, // Maintain token
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const paymentCallback = async (req, res) => {
  try {
    const { payment_id, payment_status, purchase_order_id } = req.query;

    await appointmentModel.findByIdAndUpdate(purchase_order_id, {
      payment: {
        status: payment_status === "completed" ? "completed" : "failed",
        gateway: req.query.payment_gateway,
      },
    });

    // Redirect with all original params plus token
    const redirectUrl = new URL(
      `${process.env.FRONTEND_URL}/appointments/${purchase_order_id}`
    );

    redirectUrl.searchParams.append("payment", payment_status);
    redirectUrl.searchParams.append("token", req.query.token || "");

    res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Callback error:", error);
    res.redirect(
      `${process.env.FRONTEND_URL}/payment-error?token=${req.query.token || ""}`
    );
  }
};

export { createPayment, paymentCallback };
