import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

//create-comment
router.post("/create-comment", authMiddleware, createComment);

export default router;
