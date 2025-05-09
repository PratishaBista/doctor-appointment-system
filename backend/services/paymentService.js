import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// Add this to paymentService.js before making the request
console.log("API Key Verification:", {
  exists: !!process.env.PERIPAY_API_KEY,
  length: process.env.PERIPAY_API_KEY?.length,
  first5: process.env.PERIPAY_API_KEY?.slice(0, 5),
  last5: process.env.PERIPAY_API_KEY?.slice(-5)
});

const initiatePayment = async (paymentData) => {
  const encodedApiKey = encodeURIComponent(process.env.PERIPAY_API_KEY);

  console.log(
    "Using API Key:",
    encodedApiKey ? `${encodedApiKey.slice(0, 5)}...${encodedApiKey.slice(-5)}` : "MISSING"
  );

  try {
    const response = await axios.post(
      `${process.env.PERIPAY_BASE_URL}/payment/process/initiate/`,
      {
        return_url: `${process.env.BACKEND_URL}/api/payment/callback?token=${paymentData.token}`,
        amount: Math.round(paymentData.amount * 100),
        purchase_order_id: paymentData.appointmentId,
        product_name: `Appointment with Dr. ${paymentData.doctorName}`,
        customer_name: paymentData.patientName,
        customer_email: paymentData.patientEmail,
        customer_phone: paymentData.patientPhone.replace(/\D/g, ""),
      },
      {
        headers: {
          Authorization: `Bearer ${encodedApiKey}`,
          "Content-Type": "application/json",
          "X-Debug": "true", // Helps PeriPay support identify requests
        },
        timeout: 10000, // 10 second timeout
      }
    );
    return response.data;
  } catch (error) {
    console.error("PeriPay API Error Details:", {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        headers: error.config?.headers,
      },
    });
    throw error;
  }
};

export { initiatePayment };
