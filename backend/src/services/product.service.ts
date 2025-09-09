import { uploadToCloudinary } from "../helper/uploadToCloudinary";
import Category from "../models/Category";
import Product from "../models/Product";
import { Types } from "mongoose";

export const handleImageUpload = async (files: Express.Multer.File[], category: string): Promise<string[]> => {
  const imageUrls: string[] = [];
  await Promise.all(
    files.map(async (file) => {
      const fileBuffer = file.buffer;
      const folder = `products/${category}`;
      const imageUrl = await uploadToCloudinary(fileBuffer, folder);
      imageUrls.push(imageUrl);
    })
  );
  return imageUrls;
};



export const handleCategory = async (category: string, newCategory?: string): Promise<Types.ObjectId> => {
  if (category === "new-category" && newCategory) {
    const newCategoryDoc = await Category.create({
      name: newCategory,
      slug: newCategory.toLowerCase().replace(/ /g, "-"),
    });
    return newCategoryDoc._id as Types.ObjectId;
  }

  const categoryDoc = await Category.findOne({ name: category });
  if (!categoryDoc) {
    throw new Error("Category not found");
  }
  return categoryDoc._id as Types.ObjectId;
};

export const updateProductService = async (
  productId: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    newCategory?: string;
    attributes?: { key: string; value: string }[];
    inStock?: boolean | string;
    files?: Express.Multer.File[];
    keepExistingImages?: string[];
  }
) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // ✅ Category update
  if (data.category || data.newCategory) {
    product.category = (await handleCategory(
      data.category || "",
      data.newCategory
    )) as any;
  }

  // ✅ Upload new images
  let uploadedUrls: string[] = [];
  if (data.files && data.files.length > 0) {
    uploadedUrls = await handleImageUpload(
      data.files,
      String(product.category)
    );
  }

  // ✅ Merge or replace images
  if (data.keepExistingImages) {
    product.images = [...data.keepExistingImages, ...uploadedUrls];
  } else if (uploadedUrls.length > 0) {
    product.images = uploadedUrls; // replace entirely
  }

  // ✅ Update fields if provided
  if (data.name) product.name = data.name;
  if (data.description) product.description = data.description;
  if (typeof data.price === "number") product.price = data.price;
  if (Array.isArray(data.attributes)) product.attributes = data.attributes;
  if (typeof data.inStock === "boolean") {
    product.inStock = data.inStock;
  } else if (typeof data.inStock === "string") {
    product.inStock = data.inStock === "true";
  }

  await product.save();
  return product;
};