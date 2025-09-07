import Stripe from "stripe";
import { envConfig } from "./env.config";

export const stripeConfig = new Stripe(envConfig.stripe.secretKey, {
    apiVersion: "2025-08-27.basil"
});