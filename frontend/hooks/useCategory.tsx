"use client";

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/category/categories");
      return res.data;
    },
  })};