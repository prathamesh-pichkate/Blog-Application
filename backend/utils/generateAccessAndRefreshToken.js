import User from "../models/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    console.log("accessToken : ", accessToken, "refreshToken : ", refreshToken);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    //check if refresh token is saved
    const updateUser = await User.findById(userId);
    console.log("Updated User with Refresh Token:", updateUser);

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateAccessAndRefreshToken:", error);
    throw new Error("Token generation failed");
  }
};

export default generateAccessAndRefreshToken;
