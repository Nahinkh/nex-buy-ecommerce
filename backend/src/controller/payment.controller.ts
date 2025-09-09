import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import Stripe from "stripe";
import { stripeConfig } from "../config/stripe";
import { envConfig } from "../config/env.config";
import Order from "../models/Order";
import mongoose from "mongoose";

export const paymentwithCard = asyncHandler(async (req: Request, res: Response) => {
    const signature = req.header('stripe-signature');
    let event: Stripe.Event;
    try {
        event = stripeConfig.webhooks.constructEvent(req.body, signature!, envConfig.stripe.webhookSecret!);
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            // Handle successful payment here, e.g., update order status in your databases
            res.status(200).json({ received: true });
            try {
                const { userId, items, totalAmount, shippingAddress, phone, paymentMethod } = paymentIntent.metadata;
                const orderData = new Order({
                    user: new mongoose.Types.ObjectId(userId),
                    items: JSON.parse(items!),
                    totalAmount: totalAmount,
                    shippingAddress: shippingAddress,
                    phone: phone,
                    paymentMethod: paymentMethod,
                    paymentIntentId: paymentIntent.id
                });
                await orderData.save();
                res.status(201).json({
                    message: "Order created successfully", order: orderData

                })
            } catch (error) {

                console.error("Error creating order:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        }


    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

// export const paymentwithCOD = asyncHandler(async (req: Request, res: Response) => {
//     try {
//         const { items, totalAmount, shippingAddress, phone, paymentMethod } = req.body;
//         const user = (req as Request & { user?: { _id: string } }).user;
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized" });
//         }

//         const orderData = new Order({
//             user: new mongoose.Types.ObjectId(user._id),
//             items: items,
//             totalAmount: totalAmount,
//             shippingAddress: shippingAddress,
//             phone: phone,
//             paymentMethod: paymentMethod,
//             paymentIntentId: null // No payment intent for COD
//         });

//         await orderData.save();
//         res.status(201).json({
//             message: "Order created successfully",
//             order: orderData
//         });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });
