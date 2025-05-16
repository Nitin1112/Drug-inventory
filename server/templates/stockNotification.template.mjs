import { inventory_url } from "../server.config.js";

export const notification_mail_template = (notification) => {
  const typeStyles = {
    warning: {
      color: "#ff9800",
      title: "Warning Alert",
    },
    success: {
      color: "#4caf50",
      title: "Success Notification",
    },
    danger: {
      color: "#f44336",
      title: "Critical Alert",
    },
  };

  const type = typeStyles[notification.type] || typeStyles.warning;

  const renderLowStockItems = (items) => {
    if (!items || items.length === 0) return "";
    return `
        <h3 style="color:#333;">Items Running Low on Stock:</h3>
        <ul style="padding-left: 20px; color:#333;">
          ${items
            .map((item) => {
              const [itemId, qty] = item.split("|");
              return `<li><strong>Item #${itemId}</strong> has only <strong>${qty}</strong> units left.</li>`;
            })
            .join("")}
        </ul>
      `;
  };

  const renderExpiringItems = (items) => {
    if (!items || items.length === 0) return "";
    return `
        <h3 style="color:#333;">Items Nearing Expiry:</h3>
        <ul style="padding-left: 20px; color:#333;">
          ${items
            .map(
              (item) => `<li><strong>${item}</strong> is nearing expiry.</li>`
            )
            .join("")}
        </ul>
      `;
  };

  return `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${type.title}</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
      <div style="background-color: ${
        type.color
      }; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">${type.title}</h1>
      </div>
      <div style="padding: 20px;">
        <p style="font-size: 16px; color: #333;">${notification.message}</p>
  
        <div style="margin-top: 20px; font-size: 14px; color: #555;">
          <p><strong>Notification Time:</strong> ${notification.time}</p>
          <p><strong>Created On:</strong> ${new Date(
            notification.createdAt
          ).toLocaleString()}</p>
          <p><strong>Inventory Reference:</strong> ${
            notification.inventoryId
          }</p>
          <p><strong>Sent To User:</strong> ${notification.userId}</p>
        </div>
  
        ${renderLowStockItems(notification.lowStockItems)}
        ${renderExpiringItems(notification.expiringItems)}
  
        <div style="text-align: center; margin: 30px 0;">
          <a href=${inventory_url} style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            View Inventory
          </a>
        </div>
  
        <p style="color: #777;">If you believe this notification was sent in error, please contact our support team.</p>
      </div>
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 13px; color: #888;">
        &copy; ${new Date().getFullYear()} Drug Inventory and Supply Chain Tracking System. All rights reserved.
      </div>
    </div>
  </body>
  </html>`;
};
