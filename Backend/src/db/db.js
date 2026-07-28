import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo URL:", process.env.MONGODB_URL);

    await mongoose.connect(process.env.MONGODB_URL);

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Error:");
    console.error(err);
  }
};

export default connectDB;
