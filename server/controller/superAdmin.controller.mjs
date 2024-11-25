import { User } from "../models/user.model.mjs";
import { Notification } from "../models/notification.model.mjs";
import { sendMailToUser } from "../utils/notification.util.mjs";
import { approval_mail_template } from "../templates/accountAprovel.template.mjs";
import { rejection_mail_template } from "../templates/accountReject.template.mjs";

// Super admin login
export const superAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    // Logic for admin login (authenticate super admin user)
};

// Create super admin
export const createSuperAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    // Logic to create a new super admin account
};

// Get notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({});
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch notifications." });
    }
};

// Verify user registration
export const verifyUser = async (req, res) => {
    const { userId } = req.params;
    console.log("userid: " + userId);

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        console.log(user);


        if (user.isVerified === true) {
            return res.status(200).json({ error: "User is verified." });
        }

        // Approve the user
        if (user.role === "Pharmacist" || user.role === "Vendor") {
            const isValidGST = true;
            if (!isValidGST) {
                return res.status(400).json({ error: "Invalid GST Number." });
            }
        }

        // Approve user and send mail
        user.isVerified = true;
        await user.save();

        const reUser = { id: user.id, name: user.name };

        await sendMailToUser(user.email, approval_mail_template(reUser));
        return res.status(200).json({ message: "User approved successfully." });
    } catch (error) {
        res.status(500).json({ error: "Error verifying user." });
    }
};

export const rejectVerifyUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        await User.deleteOne({ _id: user._id })

        await sendMailToUser(user.email, rejection_mail_template(user));
        return res.status(200).json({ message: "User id creation rejected and removed from database." })
    } catch (error) {
        console.log({ error: "error in superAdmin.controller" });
        res.status(500).json({ error: "Error verifying user." });
    }
}
