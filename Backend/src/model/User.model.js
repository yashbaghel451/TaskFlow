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
});

userSchema.pre("save", async function (){
  if (!this.isModified("password")) {
    console.log("Not Modified");
    
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
 
  
})

userSchema.methods.matchPassword = async function(enteredPassword){
  const compare = await bcrypt.compare(enteredPassword,this.password);
  return compare;
}

const userModel = mongoose.model("User",userSchema);

export default userModel;
