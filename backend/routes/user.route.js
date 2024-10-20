import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  validateToken,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// 1. Registration Route
router.route("/register-user").post(upload.single("image"), registerUser);

// 2. Login Route
router.route("/login").post(loginUser);

// 3. Logout Route (Protected)
router.route("/logout").post(authMiddleware, logoutUser);

//4. validateToken
router.route("/validate-token").get(authMiddleware, validateToken);

export default router;
