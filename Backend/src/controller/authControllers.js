import User from "../model/User.model.js";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Checking whether fields are not empty.
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please Fill Out all the fields.",
    });
  }

  // Checking is email is already present or not.
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message: "Email Already Exits",
    });
  }

  // Create the User Profile.
  const user = await User.create({
    name,
    email,
    password,
  });

  return res.status(200).json({
    message: "Account Created",
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};
export const loginUser = async (req, res) => {
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

  return res.status(200).json({
    message: "User Logged In",
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};
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
