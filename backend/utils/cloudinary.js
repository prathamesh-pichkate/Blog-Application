import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// 1. Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer, folder = "users") => {
  return new Promise((resolve, reject) => {
    // Use Cloudinary's upload_stream to handle the buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) {
          // Reject the promise if there's an error
          reject(error);
        } else {
          // Resolve the promise with the secure URL of the uploaded image
          resolve(result.secure_url);
        }
      }
    );

    // Write the buffer to the upload stream
    uploadStream.end(buffer);
  });
};

export { uploadToCloudinary };
