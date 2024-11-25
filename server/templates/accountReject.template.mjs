export const rejection_mail_template = (user) => {
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
            background-color: #dc3545;
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
            <h1>Registration Rejected</h1>
        </div>
        <div class="content">
            <p>Dear ${user.name},</p>
            <p>We regret to inform you that your registration for the <b>Drug Inventory and Supply Chain Tracking System</b> could not be approved.</p>
            <p>The reason for this decision is as follows:</p>
            <blockquote style="font-style: italic; color: #dc3545;">The GST number you provided could not be verified or does not meet the required standards.</blockquote>
            <p>If you believe this is an error or have any questions regarding this decision, please contact our support team at <b>support@yourdomain.com</b> for further assistance.</p>
            <p>We appreciate your interest in our platform and encourage you to reapply after addressing the mentioned concerns.</p>
            <p>Best Regards,<br>The Support Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Drug Inventory and Supply Chain Tracking System. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
};
