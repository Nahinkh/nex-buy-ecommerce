import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import Product from "../models/Product";
import { handleCategory, handleImageUpload } from "../services/product.service";
import Category from "../models/Category";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, category, description, inStock, newCategory } = req.body;
  const files = (req as Request & { files?: Express.Multer.File[] }).files;

  // ✅ attributes is now an array of {key, value} objects
  let attributes: { key: string; value: string }[] = [];
  if (req.body.attributes) {
    try {
      attributes = JSON.parse(req.body.attributes);
      if (!Array.isArray(attributes)) {
        return res.status(400).json({ message: "Attributes must be an array" });
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid attributes format" });
    }
  }

  if (!name || !description || !price || !category || !files || files.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // handle image upload
    const imageUrls = await handleImageUpload(files, category);

    // Handle category 
    const categoryId = await handleCategory(category, newCategory);

    // Create the product
    const product = await Product.create({
      name,
      description,
      price,
      category: categoryId,
      attributes, // ✅ array of objects
      inStock,
      images: imageUrls,
    });

    return res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find().populate("category");
  return res.status(200).json({ products });
});


export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  // const { name, description, price, categoryName, attributes, newCategory } = req.body;
  const { id } = req.params; // product ID
  console.log(id)
  console.log(req.body)

  // try {
  //   // Find product
  //   const product = await Product.findById(id);
  //   if (!product) {
  //     return res.status(404).json({ message: "Product not found" });
  //   }

  //   // Handle category update
  //   let categoryId = product.category; // default: keep old category
  //   if (categoryName) {
  //     const categoryDoc = await Category.findOne({ name: categoryName });
  //     let categoryId;
  //     if (!categoryDoc && categoryName === "new-category" && newCategory) {
  //       const newCategoryDoc = await Category.create({ name: newCategory, slug: newCategory.toLowerCase().replace(/ /g, "-") });
  //       categoryId = newCategoryDoc._id;
  //     } else if (categoryDoc) {
  //       categoryId = categoryDoc._id;
  //     } else {
  //       return res.status(400).json({ message: "Category not found" });
  //     }
  //   }

  //   // Update fields
  //   product.name = name ?? product.name;
  //   product.description = description ?? product.description;
  //   product.price = price ?? product.price;
  //   product.category = categoryId;
  //   product.attributes = attributes ?? product.attributes;

  //   const updatedProduct = await product.save();

  //   return res.status(200).json({
  //     message: "Product updated successfully",
  //     product: updatedProduct,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: "Internal server error" });
  // }
});

export const getSingleProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
