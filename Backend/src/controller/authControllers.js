import User from '../model/User.model.js'
import generateToken from '../utils/generateToken.js'

export const registerUser = async (req,res) => {
  const {name,email,password}=req.body;

  // Checking whether fields are not empty.
  if(!name || !email || !password){
    return res.status(400).json({
      message:"Please Fill Out all the fields."
    })
  }

  // Checking is email is already present or not.
  const userExists = await User.findOne({email});
  if(userExists){
    return res.status(400).json({
      message:"Email Already Exits"
    })
  }

  // Create the User Profile.
  const user = await User.create({
    name,
    email,
    password
  })

  return res.status(200).json({
    message:"Account Created",
    _id:user._id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id)
  })
}
export const loginUser = async (req,res) => {
  const {email,password}=req.body

  const user = await User.findOne({email}).select("+password")

  if(!user){
    return res.status(404).json({
      message:"Invalid Email Entered"
    })
  }

  const isMatch = await user.matchPassword(password)
  if(!isMatch){
    return res.status(400).json({
      message:"Invalid Password"
    })
  }

  return res.status(200).json({
    message:"User Logged In",
    _id:user._id,
    name:user.name,     
    email:user.email,
    token:generateToken(user._id)
  })
}
export const getMe = (req,res) => {
  res.status(200).json(req.user)
}
