import axiosInstance from "../axiosInstance.js";

// API for registering a new user
const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/api/user/register-user",
    userData
  );
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axiosInstance.post("/api/user/login", userData);
  return response.data;
};

const validateToken = async () => {
  const response = await axiosInstance.get("/api/user/validate-token");
  return response.data;
};

export { registerUser, loginUser, validateToken };
