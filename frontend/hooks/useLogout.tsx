import { axiosInstance } from "@/lib/axios"

export const useLogout = () => {
    axiosInstance.post("/auth/logout");
}