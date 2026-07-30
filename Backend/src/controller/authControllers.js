import User from "../model/User.model.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// ===============================
// REGISTER USER
// ===============================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check whether fields are empty
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please Fill Out all the fields.",
      });
    }

    // Check if email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }

    // Create Email Verification Token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    // Create User
    const user = await User.create({
      name,
      email,
      password,
      emailVerificationToken,
    });

    // Create Verification Link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${emailVerificationToken}`;

    // Send Verification Email
    await sendEmail({
      to: user.email,
      subject: "Verify Your TaskFlow Email",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          padding: 30px;
          background-color: #f5f7fb;
          border-radius: 10px;
        ">

          <h2 style="color: #4f46e5;">
            Welcome to TaskFlow, ${user.name}! 🚀
          </h2>

          <p>
            Thank you for creating your TaskFlow account.
          </p>

          <p>
            Please verify your email address by clicking the button below:
          </p>

          <a
            href="${verificationLink}"
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #4f46e5;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
              font-weight: bold;
            "
          >
            Verify My Email
          </a>

          <p>
            If you did not create this account, you can safely ignore this email.
          </p>

          <p>
            Thanks,<br />
            <strong>TaskFlow Team</strong>
          </p>

        </div>
      `,
    });

    // Don't generate JWT token before email verification
    return res.status(201).json({
      message:
        "Account created successfully. Please check your email to verify your account.",
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || "",
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Failed to create account",
      error: error.message,
    });
  }
};

// ===============================
// LOGIN USER
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "Invalid Email Entered",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    // Email Verification Check
    if (!user.isEmailVerified) {
      return res.status(403).json({
        message: "Please verify your email address before logging in.",
      });
    }

    return res.status(200).json({
      message: "User Logged In",
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage || "",
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
};

// ===============================
// GET CURRENT USER
// ===============================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get Me Error:", error);

    return res.status(500).json({
      message: "Failed to get user profile",
    });
  }
};

// ===============================
// UPLOAD PROFILE IMAGE
// ===============================
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Convert image buffer to Base64
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64",
    )}`;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "taskflow/profile-images",
    });

    // Save Cloudinary URL in MongoDB
    user.profileImage = result.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Profile Image Upload Error:", error);

    return res.status(500).json({
      message: "Failed to upload profile image",
      error: error.message,
    });
  }
};

// ===============================
// VERIFY EMAIL
// ===============================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user using verification token
    const user = await User.findOne({
      emailVerificationToken: token,
    });

    // Token is invalid or already used
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verification link.",
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;

    // Remove verification token
    user.emailVerificationToken = "";

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    console.error("Email Verification Error:", error);

    return res.status(500).json({
      message: "Failed to verify email",
      error: error.message,
    });
  }
};
