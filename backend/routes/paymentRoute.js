import express from "express";
import { initiatePeriPayPayment } from "../controllers/paymentController.js";
import authUser from "../middlewares/authUser.js";

const paymentRouter = express.Router();

// Payment initiation route
paymentRouter.post("/initiate", authUser, initiatePeriPayPayment);

// PeriPay connectivity test route
paymentRouter.get("/test-connectivity", async (req, res) => {
  try {
    const testPayload = {
      return_url: process.env.PERIPAY_RETURN_URL,
      amount: 100, // Minimum amount (1 NPR)
      purchase_order_id: "CONNECTION-TEST",
      product_name: "Connection Test",
      customer_name: "Test User",
      customer_email: "test@example.com",
      customer_phone: "9800000000"
    };

    const encodedApiKey = encodeURIComponent(process.env.PERIPAY_API_KEY);
    
    const response = await axios.post(
      `${process.env.PERIPAY_API_URL}/api/payment/process/initiate/`,
      testPayload,
      {
        headers: {
          Authorization: `Bearer ${encodedApiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      success: true,
      status: "Connection successful",
      response: response.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Connection test failed",
      error: error.response?.data || error.message,
      debug: {
        apiKey: process.env.PERIPAY_API_KEY?.substring(0, 4) + "...",
        apiUrl: process.env.PERIPAY_API_URL
      }
    });
  }
});

export default paymentRouter;