/* eslint-disable no-undef */
import express from "express";
import { addAdmin, getAdmins } from '../controller/admin-controller.js';
import { adminLogin } from "../controller/admin-controller.js";
const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", adminLogin);
adminRouter.get("/", getAdmins);

export default adminRouter;
