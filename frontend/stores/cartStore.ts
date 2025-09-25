import { toast } from "sonner";
import { create } from "zustand";
import { persist as zustandPersist } from "zustand/middleware";

type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

type CartState = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
}

export const useCartStore = create<CartState>()(
    zustandPersist(
        (set) => ({
            cartItems: [],

            addToCart: (item) =>
                set((state) => {
                    const productId = item._id; // ✅ normalize id

                    const existing = state.cartItems.find((p) => p._id === productId);

                    if (existing) {
                        toast.success(`Increased quantity of ${item.name} in cart!`);
                        return {
                            cartItems: state.cartItems.map((p) =>
                                p._id === productId
                                    ? { ...p, quantity: p.quantity + (item.quantity || 1) }
                                    : p
                            ),
                        };
                    }

                    toast.success(`${item.name} added to cart!`);
                    return {
                        cartItems: [
                            ...state.cartItems,
                            { ...item, id: productId, quantity: item.quantity || 1 }, // ✅ new item always added
                        ],
                    };
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    cartItems: state.cartItems.filter((item) => item._id !== id),
                })),

            clearCart: () => set({ cartItems: [] }),

            increaseQuantity: (id) =>
                set((state) => {
                    toast.success("Increased item quantity in cart!");
                    return {
                        cartItems: state.cartItems.map((item) =>
                            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    };
                }),

            decreaseQuantity: (id) =>
                set((state) => {
                    toast.success("Decreased item quantity in cart!");
                    return {
                        cartItems: state.cartItems.map((item) =>
                            item._id === id && item.quantity > 1
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        ),
                    };
                }),
        }),
        {
            name: "cart-storage", // key in localStorage
        }
    )
);

