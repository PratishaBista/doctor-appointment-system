import axios from "axios";
import appointmentModel from "../models/appointmentModel.js";
import dotenv from "dotenv";
dotenv.config();

const initiatePeriPayPayment = async (req, res) => {
  try {
    console.log("PeriPay Config:", {
      apiKey: process.env.PERIPAY_API_KEY?.substring(0, 4) + "...",
      apiUrl: process.env.PERIPAY_API_URL,
      returnUrl: process.env.PERIPAY_RETURN_URL,
    });

    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "Appointment ID is required",
      });
    }

    const appointment = await appointmentModel
      .findById(appointmentId)
      .populate("userData")
      .populate("doctorData");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const encodedApiKey = encodeURIComponent(process.env.PERIPAY_API_KEY);

    const payload = {
      return_url: process.env.PERIPAY_RETURN_URL,
      amount: Math.round(appointment.amount * 100), 
      purchase_order_id: `APPT-${appointment._id}`,
      product_name: `Appointment with Dr. ${appointment.doctorData.name}`,
      customer_name: appointment.userData.name,
      customer_email: appointment.userData.email,
      customer_phone: appointment.userData.phone || "9800000000",
    };

    console.log("Sending payload to PeriPay:", payload);

    const response = await axios.post(
      `${process.env.PERIPAY_API_URL}/api/payment/process/initiate`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${encodedApiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return res.json({
      success: true,
      paymentUrl: response.data.payment_url,
      paymentData: response.data,
    });
  } catch (error) {
    console.error("Full Payment Error:", {
      message: error.message,
      stack: error.stack,
      response: {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      },
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
        data: error.config?.data,
      },
    });

    return res.status(error.response?.status || 500).json({
      success: false,
      message: "Payment processing failed",
      debug:
        process.env.NODE_ENV === "development"
          ? {
              error: error.message,
              periPayResponse: error.response?.data,
            }
          : undefined,
    });
  }
};

export { initiatePeriPayPayment };
