import mongoose from "mongoose";

interface Order {
    user:mongoose.Schema.Types.ObjectId;
    items: {
        product: mongoose.Schema.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: 'cod' | 'card';
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    phone: string;
}

const orderSchema = new mongoose.Schema<Order>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'card'],
        default: 'cod'
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

const Order = mongoose.model<Order>("Order", orderSchema);
export default Order;