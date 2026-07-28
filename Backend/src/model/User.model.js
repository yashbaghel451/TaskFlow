import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [8, "Password must contain * characters"],
    select: false,
  },

  profileImage: {
    type: String,
    default: "",
  },
});

// Password Hash
userSchema.pre("save", async function () {
  // Agar password change nahi hua hai
  // to hashing dobara mat karo
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Password Match
userSchema.methods.matchPassword = async function (enteredPassword) {
  const compare = await bcrypt.compare(enteredPassword, this.password);

  return compare;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
