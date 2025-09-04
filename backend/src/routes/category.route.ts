import { Router } from "express";
import { getCategory } from "../controller/category.controller";

const categoryRoutes = Router();

categoryRoutes.get("/categories", getCategory);

export default categoryRoutes;
