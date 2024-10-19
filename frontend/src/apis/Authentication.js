import axiosInstance from "../axiosInstance.js";

// API for registering a new user
const registerUser = async (userData) => {
  const response = await axiosInstance.post(
    "/api/user/register-user",
    userData
  );
  return response.data;
};

export { registerUser };
