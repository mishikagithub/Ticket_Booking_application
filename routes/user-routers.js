/* eslint-disable no-undef */
import express from "express";
import { deleteuser, getAllUsers, getBookingsOfUser, signup, updateuser, userlogin } from "../controller/user-controller.js"; // Ensure correct path and extension

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id",updateuser); 
userRouter.delete("/:id",deleteuser);
userRouter.post("/login", userlogin)// Corrected function name to signup
userRouter.get("/bookings/:id",getBookingsOfUser);
export default userRouter;

//booking delete wala part postman se incomplete hai