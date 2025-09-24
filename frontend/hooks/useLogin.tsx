"use client";

import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      const res = await axiosInstance.post("/auth/login", data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser({
        ...data.user,
        password: data.user.password ?? "",
      });
      // sessionStorage.setItem("token", data.token);
      // const redirectPath = sessionStorage.getItem("redirectAfterLogin") || "/";
      // sessionStorage.removeItem("redirectAfterLogin");

      toast.success("Login successful!");
      router.push("/");
      return;
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        router.push("/login");
        toast.error(error?.response?.data?.message || "Login failed. Please try again.");
      }

    },
  });

  return mutation;
};