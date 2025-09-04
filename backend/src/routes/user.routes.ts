import { Request, Response, Router } from "express";
import { createUser, getProfile, loginUser, logoutUser } from "../controller/user.controller";
import { isAuthenticated } from "../middleware/auth";

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any; // Replace 'any' with your actual user type if available
    }
  }
}

const userRoutes = Router();

userRoutes.post("/register", createUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.get("/profile", isAuthenticated, getProfile);

export default userRoutes;
