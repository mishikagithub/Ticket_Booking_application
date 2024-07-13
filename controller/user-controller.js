/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// controller.js/user-controller.js
import Booking from "../model/Booking.js";
import User from "../model/User.js"; // Correct path and extension
import bcrypt from "bcryptjs"
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);// Pass error to error handling middleware
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Corrected validation logic
  if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
const hashPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ name, email, password:hashPassword });
    user = await user.save(); // Added await to properly handle the promise
  } catch (err) {
    return console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  return res.status(201).json({ user });
};

export const updateuser = async(req,res,next)=>{
  const id = req.params.id;
  const { name, email, password } = req.body;

  // Corrected validation logic
  if (!name || name.trim() === "" || !email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashPassword = bcrypt.hashSync(password);
  let user;
  try{
user = await User.findByIdAndUpdate(id,{name,email,password:hashPassword,})
  }catch(err){
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected error occurred" });
  }

  return res.status(201).json({message:"updated successfully" });
}; 

export const deleteuser = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Find the user by ID and remove;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

//to login
export const userlogin = async(req,res,next)=>{
  const id = req.params.id;
  const {email,password} = req.body;
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existinguser;
  try {
    existinguser = await User.findOne({email});
  } catch (error) {
    return res.console.log(error)   
  }
  if(!existinguser){
    return res.status(400).json({message:"Invalid user"})
  }
  const isPasswordCorrect = bcrypt.compareSync(password,existinguser.password);

  if(!isPasswordCorrect){
    return res.status(400).json({message:"Invalid password"});
  }
  return res.status(200).json({message:"login successful"})
}

export const getBookingsOfUser = async (req,res,next)=>{
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Booking.find({user:id});
  } catch (error) {
    return console.log(error);
  }
  if(!bookings){
    return res.status(500).json({message:"Unable to get booking"})
  }
  return res.status(200).json({bookings});
}