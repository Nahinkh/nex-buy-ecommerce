import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Replace with your backend URL
  withCredentials: true, // Send cookies if your backend uses JWT in cookies
});