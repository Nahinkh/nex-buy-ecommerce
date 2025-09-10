import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Replace with your backend URL
  withCredentials: true, // Send cookies if your backend uses JWT in cookies
});
axiosInstance.interceptors.request.use((config)=>{
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})