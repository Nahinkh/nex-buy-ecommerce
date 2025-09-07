import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import Stripe from "stripe";
import { stripeConfig } from "../config/stripe";

export const paymentwithCard = asyncHandler(async (req:Request, res:Response) => {
    try {
        const { amount, currency = "usd" } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }
        const paymentIntent = await stripeConfig.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to smallest currency unit
            currency,
            payment_method_types: ['card'],
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});