import axios from "axios";

// Set base URL for your backend API (replace with your backend URL)
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
