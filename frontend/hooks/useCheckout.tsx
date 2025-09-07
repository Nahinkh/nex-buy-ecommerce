'use client'
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useCheckout = () => {
    return useMutation({
        mutationFn: async ({ cartItems, totalAmount, shippingAddress }: { cartItems: any[]; totalAmount: number; shippingAddress: any }) => {
            const response = await axiosInstance.post("/order/create", {
                items: cartItems,
                totalAmount,
                shippingAddress
            });
            console.log(response.data);
            return response.data;
        }
    })


}