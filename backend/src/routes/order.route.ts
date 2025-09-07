import { Router } from "express";
import { createOrder } from "../controller/order.controller";
import { isAuthenticated } from "../middleware/auth";

const orderRoutes = Router();

orderRoutes.post("/create",isAuthenticated,createOrder);

export default orderRoutes;
