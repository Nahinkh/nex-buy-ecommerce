import { Router } from "express";
import { createProduct, getProducts, getSingleProduct, updateProduct } from "../controller/product.controller";
import upload from "../middleware/upload";

const productRoutes = Router();

productRoutes.post("/create",upload.array('images',5) ,createProduct);
productRoutes.get("/products", getProducts);
productRoutes.put("/update/:id", upload.array('images'),updateProduct);
productRoutes.get("/:id", getSingleProduct);
// to delete a product and single product

export default productRoutes;
