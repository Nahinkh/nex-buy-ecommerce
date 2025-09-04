import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddProduct = () => {
    return useMutation({
        mutationFn: async (data: FormData) => {
            console.log(data)
            const res = await axiosInstance.post("/product/create", data, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            return res.data;
        }
    })
};
