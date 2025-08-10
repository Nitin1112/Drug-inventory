import { User } from "../models/user.model.mjs";
import { sendNotificationToAdmin, sendMailToAdmin, sendMail } from "../utils/notification.util.mjs";

import { admin_mails } from "../server.config.js";
import { gst_verification_template } from "../templates/gstVerification.template.mjs";
import { account_under_verification_template } from "../templates/accountUnderVerification.template.mjs";
import Inventory from "../models/inventory.model.mjs";


export const getUserData = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const userData = await User.findById(userId);

        if (userData) {
            return res.status(200).json({ user: userData });
        }
        return res.status(404).json({ error: "User not found" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error.", message: error.messge });
    }
}

export const registerUser = async (req, res) => {
    try {
        const { name, email, role, gstNumber } = req.body;

        const find_user = await User.findOne({ email: email });
        if (find_user) {
            return res.json({ error: "User already exists" })
        }

        // Validate required fields
        if (!name || !email || !role) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // GST number is mandatory for specific roles
        if ((role === "Pharmacist" || role === "Vendor") && !gstNumber) {
            return res.status(400).json({ error: "GST number is required for this role." });
        }

        // Save the user in pending state
        const newUser = new User({
            name,
            email,
            role,
            gstNumber,
        });

        await newUser.save();

        // Notify the super admin
        const notificationMessage = `A new user (${role}) has registered with GST Number: ${gstNumber || "N/A"}.`;
        // await sendNotificationToAdmin(notificationMessage);
        await sendMail(email, "Your Account is Under Verification", account_under_verification_template(newUser))
        const template = gst_verification_template(newUser);
        admin_mails.map(async (mail) => await sendMailToAdmin(mail, template));

        return res.status(200).json({
            message: "User registration submitted successfully. Pending admin approval.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        console.log("Email: " + email);
        console.log("Password: " + password);

        let find_user = await User.findOne({ email: email });

        if (!find_user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!find_user.isPasswordReset) {
            return res.status(402).json({ error: 'Reset password to continue' });
        }

        find_user = await User.findOne({ email: email, password: password });

        if (find_user) {
            return res.status(200).json({ message: "Login successful" });
        }

        return res.status(401).json({ error: 'Unauthorized' });
    } catch (error) {
        console.log({ message: "error in userreg.controller", error: error.message });

        return res.status(500).json({ error: "Internal Server Error." });
    }

}

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        console.log("Token: " + token);
        console.log("Password: " + newPassword);

        let find_user = await User.findOne({ _id: token });

        if (!find_user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const found_inventory = await Inventory.findOne({ owner: token });

        if (!found_inventory) {
            const inventoryData = {
                owner: find_user._id,
                items: [],
            };
            const userInventory = Inventory(inventoryData);

            find_user.password = newPassword;
            find_user.isPasswordReset = true;
            await userInventory.save();
        }

        await find_user.save();

        return res.status(200).json({ message: 'password reset successful' });
    } catch (error) {
        console.log({ message: "error in userreg.controller", error: error.message });

        return res.status(500).json({ error: "Internal Server Error." });
    }
}

