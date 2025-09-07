import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import Order from "../models/Order";
import mongoose from "mongoose";

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
    try {
    const { items, totalAmount, shippingAddress, phone, paymentMethod } = req.body;
    const user = (req as Request & { user?: { _id: string } }).user;

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log(user._id);
    console.log(req.body);

    if (!items || items.length === 0 || !totalAmount || !shippingAddress) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate items
    const validItems = items.map((item: any) => {
        if (!mongoose.Types.ObjectId.isValid(item.id)) {
            throw new Error(`Invalid product ID: ${item.id}`);
        }
        return {
            product: new mongoose.Types.ObjectId(item.id),
            quantity: item.quantity,
            price: item.price,
        };
    });

    // Create a new order
    const order = new Order({
        user: new mongoose.Types.ObjectId(user._id),
        items: validItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
        phone
    });

    console.log(order);

    await order.save();

    res.status(201).json({ message: "Order created successfully", order });
} catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal server error" });
}

});
