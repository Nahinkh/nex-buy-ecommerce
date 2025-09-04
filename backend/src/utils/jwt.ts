import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.config';
import { Response } from 'express';

export const generateToken = (id: string,email:string) => {
    return jwt.sign(
        { id,email },
        envConfig.jwtSecret as string,
        { expiresIn: '7d' }
    );
}

export const sendToken = (res:Response,userId:string,email:string)=>{
    const token = generateToken(userId,email);
    res.cookie('token',token,{
        httpOnly:true,
        secure:envConfig.nodeEnv === 'production',
        sameSite:'strict',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })
    return token;
}
