import mongoose, { Document } from "mongoose";
interface ICategory extends Document {
    name: string;
    slug: string;
}

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true }
})

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
