import { create } from "zustand";

type CartItem = {
  id: string;
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

export const useCartStore = create<CartState>((set) => ({
    cartItems: [],
    addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            return {
                cartItems: state.cartItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
            };
        }
        return { cartItems: [...state.cartItems, item] };
    }),
    removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== id)
    })),
    clearCart: () => set(() => ({
        cartItems: []
    })),
    increaseQuantity: (id) => set((state) => ({
        cartItems: state.cartItems.map(cartItem =>
            cartItem.id === id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    })),
    decreaseQuantity: (id) => set((state) => ({
        cartItems: state.cartItems.map(cartItem =>
            cartItem.id === id
                ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) }
                : cartItem
        )
    })),

}))
