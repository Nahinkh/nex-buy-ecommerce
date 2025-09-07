import { useCartStore } from "@/stores/cartStore";

export const useCart = () => {
    const cart = useCartStore((state)=>state.cartItems);
    const addToCart = useCartStore((state)=>state.addToCart);
    const removeFromCart = useCartStore((state)=>state.removeFromCart);
    const clearCart = useCartStore((state)=>state.clearCart);
    const increaseQuantity = useCartStore((state)=>state.increaseQuantity);
    const decreaseQuantity = useCartStore((state)=>state.decreaseQuantity);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        total
    }
}