"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    email: string;
    password?: string;
  };
  token: string;
}

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser({
        ...data.user,
        password: "", // Provide password if available, otherwise use empty string
      });
      toast.success("Login successful!");
    },
  });

  return mutation;
};