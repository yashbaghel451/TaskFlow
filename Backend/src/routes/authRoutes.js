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

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.put(
  "/profile-image",
  protect,
  upload.single("profileImage"),
  uploadProfileImage
);

export default router;
