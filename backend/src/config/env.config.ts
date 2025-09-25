import 'dotenv/config';

export const envConfig = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI as string,
  jwtSecret: process.env.JWT_SECRET as string,
  nodeEnv: process.env.NODE_ENV as string,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  apiKey: process.env.CLOUDINARY_API_KEY as string,
  apiSecret: process.env.CLOUDINARY_API_SECRET as string,
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY as string,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY as string,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
  },
  corsOrigin: process.env.CORS_ORIGIN as string,
};
