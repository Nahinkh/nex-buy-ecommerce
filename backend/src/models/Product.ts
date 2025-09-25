
import mongoose, { Document,Types } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  inStock: boolean;
  newCategory?: string;
  attributes: { key: string; value: string }[];
  images: string[];
}



const productSchema = new mongoose.Schema<IProduct>({
name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
  attributes: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
    images: {
        type: [String],
        default: []
    },
    inStock: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
