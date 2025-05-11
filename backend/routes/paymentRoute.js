import express from 'express';
import { createPayment, paymentCallback } from '../controllers/paymentController.js';
import authUser from '../middlewares/authUser.js';

const router = express.Router();

// Patient initiates payment
router.post('/create', authUser, createPayment);

// PeriPay callback URL (no auth needed)
router.get('/callback', paymentCallback);

export default router;