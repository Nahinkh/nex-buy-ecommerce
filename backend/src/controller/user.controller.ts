import { asyncHandler } from "../middleware/asyncHandler";
import e, { Request, Response } from "express";
import User from "../models/User";
import { sendToken } from "../utils/jwt";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, address } = req.body;
    // Validate user input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        // Check user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({
            name,
            email,
            password,
            address
        }) as typeof User.prototype;

        sendToken(res, user._id.toString(), user.email);

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const user = await User.findOne({ email }) as typeof User.prototype;
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (user && (await user.comparePassword(password))) {
            sendToken(res, user._id.toString(), user.email);
            res.json({
                message: "Login successful",
                user
            });
        }else{
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
})

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
})