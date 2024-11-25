import express from "express";

import {
    createSuperAdmin,
    getNotifications,
    superAdminLogin,
    verifyUser,
    rejectVerifyUser,
} from "../controller/superAdmin.controller.mjs"

const adminRouter = express.Router();

// Super admin login
adminRouter.post("/login", superAdminLogin);

// Create a super admin
adminRouter.post("/create", createSuperAdmin);

// Get notifications
adminRouter.get("/notifications", getNotifications);

// Verify user registration
adminRouter.get("/verify-user/:userId", verifyUser);

// Verify user registration
adminRouter.get("/verify-user/:userId/reject", rejectVerifyUser);

export default adminRouter;
