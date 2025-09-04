"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";


const fetchProduct = async (id: string) => {
  const res = await axiosInstance.get(`/product/${id}`);
  return res.data;
};

export function useSingleProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, // fetch only if id exists
  });
}
