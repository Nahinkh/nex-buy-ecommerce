import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axiosInstance.get('/product/products');
            return response.data;
        }
    })
};
