export const server_config = {
  port: 8000,
  f_port: 5173,
  mongodb_connection_string:
    "mongodb+srv://navin82005:navin82005@main-cluster.0r8mf.mongodb.net/PharmaOne?retryWrites=true&w=majority&appName=Main-Cluster",
};

export const backend_url = "http://localhost:" + server_config.port;
export const frontend_url = "http://localhost:" + server_config.f_port;

export const nodemailer_config = {
  service: "Gmail",
  secured: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "pharmaone.helpdesk@gmail.com",
    pass: "kzebtswoaavgxskw",
  },
};

export const gst_verification_url = `${backend_url}/api/admin/verify-user`;
export const password_reset_url = `${backend_url}/api/user/reset-password`;

export const admin_mails = [
  "pharmaone.helpdesk@gmail.com",
  "navin82005@gmail.com",
];
export const inventory_url = `${frontend_url}/inventory/medicines`;
