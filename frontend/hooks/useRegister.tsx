"use client";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: RegisterData): Promise<RegisterResponse> => {
      const res = await axiosInstance.post("/auth/register", data);
      if (res.status !== 201) {
        throw new Error("Registration failed");
      }
      console.log(res.data);
      return res.data;
    },
    onSuccess: async (data) => {
      toast.success("Registration successful!");
      router.push("/login");
      setUser({
        ...data.user,
        password: "", // Provide password if available, otherwise use empty string
      });
      return;
    },
    onError(error, variables, context) {
      // Cast error to AxiosError to access response property
      const err = error as any;
      if (err.response?.status === 400) {
        toast.error("User already exists. Please login.");
        router.push("/login");
        return;
      }
    },
  });

  return mutation;
};
