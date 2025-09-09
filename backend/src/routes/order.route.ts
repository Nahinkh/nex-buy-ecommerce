import { Router } from "express";
import { createOrderOnCOD } from "../controller/order.controller";
import { isAuthenticated } from "../middleware/auth";

const orderRoutes = Router();

orderRoutes.post("/cod", isAuthenticated, createOrderOnCOD);

export default orderRoutes;
