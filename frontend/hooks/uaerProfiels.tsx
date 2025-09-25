"use client";

import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";


interface ProfileResponse {
user:{
     _id: string;
    name: string;
    email: string;
   profilePicture?: string;
}
}

export const useProfile = (
  options?: Omit<UseQueryOptions<ProfileResponse>, "queryKey" | "queryFn">
) => {
  const setUser = useAuthStore((state) => state.setUser);

  return useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/profile");
      setUser(res.data.user);
      return res.data;
    },
    ...options,
  });
};
