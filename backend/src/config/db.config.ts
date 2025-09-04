import mongoose from "mongoose";
import { envConfig } from "./env.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(envConfig.mongodbUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
