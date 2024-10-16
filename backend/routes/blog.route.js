import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../middleware/multer.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js"; // Import your auth middleware

const router = Router();

// Ensure that authMiddleware runs before upload and createBlog
router.post(
  "/create-blog",
  authMiddleware,
  upload.single("blogImageUrl"),
  createBlog
);

// Route to update a blog post. Use the patch request
router.patch(
  "/update-blog/:blogId",
  authMiddleware,
  upload.single("blogImageUrl"),
  updateBlog
);

router.delete("/delete-blog/:blogId", authMiddleware, deleteBlog);

export default router;
