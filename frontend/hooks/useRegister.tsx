"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user: {
    name: string;
    email: string;
    password?: string;
  };
  token: string;
}

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: async (data: RegisterData): Promise<RegisterResponse> => {
      const res = await axiosInstance.post("/auth/register", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser({
        ...data.user,
        password: "", // Provide password if available, otherwise use empty string
      });
      toast.success("Registration successful!");
    },
  });

  return mutation;
};
