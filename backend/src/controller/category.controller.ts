import { asyncHandler } from "../middleware/asyncHandler";
import Category from "../models/Category";
import { Request, Response } from "express";

export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});
