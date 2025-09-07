import { Router } from "express";
import { paymentwithCard } from "../controller/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/create-payment-intent", paymentwithCard);

export default paymentRouter;
