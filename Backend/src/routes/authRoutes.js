import express from "express";

import {
  getMe,
  loginUser,
  registerUser,
  uploadProfileImage,
} from "../controller/authControllers.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get Current User
router.get("/me", protect, getMe);

// Upload Profile Image
router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage,
);

export default router;
