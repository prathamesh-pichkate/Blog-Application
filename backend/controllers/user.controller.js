import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefreshToken.js";

const registerUser = asyncHandler(async (req, res) => {
  // Extract user data from the request body
  const { firstname, lastname, username, email, password } = req.body;

  // 1. Validate Required Fields
  if (
    [firstname, lastname, username, email, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }

  // 2. Check if User Already Exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, "User with this username or email already exists");
  }

  // 3. Handle Image Upload
  let imageUrl = process.env.DEFAULT_IMAGE_URL;

  if (req.file) {
    try {
      imageUrl = await uploadToCloudinary(req.file.buffer, "users");
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new ApiError(500, "Image upload failed");
    }
  }

  // Create new user
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email,
    password, // Password will be hashed by the pre-save hook
    imageUrl,
  });

  console.log(newUser);

  // Return response
  res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        imageUrl: newUser.imageUrl,
        createdAt: newUser.createdAt,
      },
    })
  );
});

const loginUser = asyncHandler(async (req, res) => {
  //get the data
  const { email, username, password } = req.body;
  console.log("email:", email, "username :", username, "password : ", password);

  //check if username or email exist
  if (!username && !email) {
    throw new ApiError(400, "Please provide username or email");
  }

  //find user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User not found!");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user crediential");
  }

  //generate the refresh and access token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
  };

  console.log("Refresh Token", refreshToken);
  console.log("Access Token", accessToken);
  console.log("User", user);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in Succesfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // 1. Check if req.user is populated
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized");
  }

  // 2. Remove refreshToken from the user's document
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
  } catch (error) {
    console.error("Error during logout:", error);
    throw new ApiError(500, "Internal Server Error");
  }

  // 3. Define cookie options with environment-based secure flag
  const isProduction = process.env.NODE_ENV === "production";

  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "Strict", // Adjust as needed
    path: "/", // Ensure it matches how cookies were set
    maxAge: 0, // Immediately expire the cookie
  };

  // 4. Clear the cookies and send response
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser, loginUser, logoutUser };
