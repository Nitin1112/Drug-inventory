import { password_reset_url } from "../server.config.js";

export const approval_mail_template = (user) => {
    return `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4caf50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            color: #333333;
            line-height: 1.6;
        }
        .button-container {
            text-align: center;
            margin: 20px 0;
        }
        .button {
            background-color: #007BFF;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Account Approved</h1>
        </div>
        <div class="content">
            <p>Dear ${user.name},</p>
            <p>We are pleased to inform you that your registration for the <b>Drug Inventory and Supply Chain Tracking System</b> has been approved.</p>
            <p>To set up your password and access your account, please click the button below:</p>
            <div class="button-container">
                <a href="${password_reset_url}?token=${user.id}" class="button">Set Your Password</a>
            </div>
            <p>If you did not request an account or have any questions, please contact our support team immediately.</p>
            <p>Thank you for being a part of our platform.</p>
            <p>Best Regards,<br>The Support Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Drug Inventory and Supply Chain Tracking System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
