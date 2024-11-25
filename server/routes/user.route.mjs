import express from "express";
import { registerUser, loginUser, resetPassword } from "../controller/userreg.controller.mjs";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/reset-password", resetPassword);

export default userRouter;
