
import mongoose, { Document } from "mongoose";

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId;
  inStock: boolean;
  newCategory?: string;
  attributes: Record<string, string>; // object key-value
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
  attributes: {
    type: Map,
    of: String, // each key/value is a string
    default: {}
  },
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
