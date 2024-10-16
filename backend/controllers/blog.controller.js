import Blog from "../models/blog.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const createBlog = asyncHandler(async (req, res) => {
  // Destructure required fields from request body
  const { title, description, tags } = req.body;

  // Validation to ensure required fields are not empty
  if ([title, description].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "Title and description are required!");
  }

  // Ensure tags is an array with at least one tag
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new ApiError(400, "At least one tag is required!");
  }

  // Get the author from the logged-in user (assumed to be set in req.user from auth middleware)
  const author = req.user._id;

  // Initialize blogImageUrl
  let blogImageUrl = null;

  // Check if a file is provided for the blog image
  if (req.file) {
    try {
      blogImageUrl = await uploadToCloudinary(req.file.buffer, "blogs");
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new ApiError(500, "Image upload failed");
    }
  }

  // Create the blog
  const blog = await Blog.create({
    title,
    description,
    blogImageUrl,
    author,
    tags,
    publishedAt: new Date(), // Automatically set to current date
  });

  console.log(blog);

  if (!blog) {
    throw new ApiError(500, "Failed to create blog");
  }

  // Return response with created blog data
  res.status(201).json(new ApiResponse(201, "Blog Created Successfully", blog));
});

// Update Blog Function
const updateBlog = asyncHandler(async (req, res) => {
  // Get the blog ID from URL parameters
  const { blogId } = req.params;

  // Extract new data from request body
  const { title, description, tags } = req.body;

  // Initialize variables for image update
  let newImageUrl = null;

  // Validate input (title and description are required if provided)
  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Title and description cannot be empty!");
  }

  // Find the blog by ID
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  // Check if the logged-in user is the author of the blog
  if (req.user._id.toString() !== blog.author.toString()) {
    throw new ApiError(403, "You are not authorized to update this blog");
  }

  // Handle new image upload if provided
  if (req.file) {
    try {
      newImageUrl = await uploadToCloudinary(req.file.buffer, "blogs");
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      throw new ApiError(500, "Image upload failed");
    }
  }

  // Update the blog with new data
  blog.title = title || blog.title;
  blog.description = description || blog.description;
  blog.tags = tags || blog.tags;
  if (newImageUrl) blog.blogImageUrl = newImageUrl;

  // Save the updated blog to the database
  await blog.save();

  // Send success response
  res.status(200).json({
    message: "Blog updated successfully",
    blog,
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  // Request the blogId from req.params
  const { blogId } = req.params;

  // Find the blog using blogId
  const blog = await Blog.findById(blogId);

  // Check if the blog exists
  if (!blog) {
    throw new ApiError(404, "Blog not found!");
  }

  // Verify if the logged-in user is the author of the blog
  if (req.user._id.toString() !== blog.author.toString()) {
    throw new ApiError(403, "You are not authorized to delete this blog.");
  }

  // Delete the blog
  await blog.deleteOne();

  // Send a success response
  res.status(200).json({
    message: "Blog deleted successfully!",
  });
});

export { createBlog, updateBlog, deleteBlog };
