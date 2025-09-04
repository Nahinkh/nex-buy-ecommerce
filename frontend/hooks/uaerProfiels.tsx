"use client";

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";


interface ProfileResponse {
  id: string;
  email: string;
}

export const useProfile = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<ProfileResponse> => {
      const res = await axiosInstance.get("/auth/profile");
      setUser(res.data);
      console.log(res.data);
      return res.data;
    },
  })};
