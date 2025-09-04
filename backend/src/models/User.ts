import mongoose, { Document } from "mongoose";
import { User } from "../type/user.type";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address?: string;
  profilePicture?: string;
  role?: string;
  provider?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "user"
    },
    provider: {
        type: String,
        default: "local"
    }
}, { timestamps: true })

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;