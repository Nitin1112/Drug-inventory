export const account_under_verification_template = (user) => {
    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
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
      background-color: #007BFF;
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
      <h1>Account Verification In Progress</h1>
    </div>
    <div class="content">
      <p>Dear ${user.name},</p>
      <p>Thank you for registering with the <b>Drug Inventory and Supply Chain Tracking System</b>.</p>
      <p>Your account is currently under verification and will be reviewed by our team within 2 business days.</p>
      <p>
        Once your account is approved, you will receive an email with further instructions, including a link to set up your password.
        If there are any issues or additional details required, our team will reach out to you via email.
      </p>
      <p>We appreciate your patience and understanding during this process.</p>
      <p>If you have any questions, feel free to contact our support team at <a href="mailto:pharmaone.helpdesk@gmail.com">pharmaone.helpdesk@gmail.com</a>.</p>
      <p>Best Regards,</p>
      <p>The Support Team</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Drug Inventory and Supply Chain Tracking System. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};
