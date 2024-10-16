import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: process.env.DEFAULT_IMAGE_URL,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//pre hook to convert the passwrod into hash
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//method to check if password given by user is correct or not
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//method to generate the accessToken
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      //payload
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
    },
    //secretKey
    process.env.ACCESS_TOKEN_SECRET,
    {
      //options
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//method to generate the refresh token
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      //payload
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    //secret key
    process.env.REFRESH_TOKEN_SECRET,
    {
      //options
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
