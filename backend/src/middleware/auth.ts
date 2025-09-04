import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config";
import User from "../models/User";

interface AuthRequest extends Request {
    user?: any;
}

export const isAuthenticated = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if(req.cookies?.token){
        token = req.cookies.token;
    }
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, envConfig.jwtSecret) as { id: string };
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
