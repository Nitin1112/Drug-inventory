import nodemailer from "nodemailer";
import { Notification } from "../models/notification.model.mjs";
import { gst_verification_url, nodemailer_config } from "../server.config.js";

export const sendNotificationToAdmin = async (message) => {
    try {
        const notification = new Notification({ message });
        await notification.save();
    } catch (error) {
        console.error("Error sending notification: ", error);
    }
};

export const sendMailToAdmin = async (adminEmail, template) => {
    const transporter = nodemailer.createTransport(nodemailer_config);

    const mailOptions = {
        to: adminEmail,
        subject: "New User Registration",
        html: template,
    };

    try {
        console.log("Sending mail to superadmin...");
        await transporter.sendMail(mailOptions);
        console.log("Mail sent to superadmin...");
    } catch (error) {
        console.error("Error sending mail: ", error);
    }
};

export const sendMail = async (mail, subject, template) => {
    const transporter = nodemailer.createTransport(nodemailer_config);

    const mailOptions = {
        to: mail,
        subject: subject,
        html: template
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending mail: ", error);
    }
}

export const sendMailToUser = async (userEmail, template) => {
    const transporter = nodemailer.createTransport(nodemailer_config);

    let mailOptions = {
        to: userEmail,
        subject: "Account Verification Status",
        html: template,
    }

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending mail: ", error);
    }
};
