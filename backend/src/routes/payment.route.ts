import { Router } from "express";
import { paymentwithCard } from "../controller/payment.controller";
import express from "express";

const paymentRouter = Router();

paymentRouter.post("/create-webhook/stripe", express.raw({ type: "application/json" }), paymentwithCard);

export default paymentRouter;
