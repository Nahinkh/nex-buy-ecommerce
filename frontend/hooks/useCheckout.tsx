'use client'
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useCheckout = () => {
    return useMutation({
        mutationFn: async ({ cartItems, totalAmount, shippingAddress, paymentMethod, phone}: { cartItems: any[]; totalAmount: number; shippingAddress: any, paymentMethod: 'cod' | 'card' , phone: string }) => {
            const response = await axiosInstance.post("/order/cod", {
                items: cartItems,
                totalAmount,
                shippingAddress,
                paymentMethod,
                phone
            });
            console.log(response.data);
            return response.data;
        }
    })


}