import cron from "node-cron";
import { Notification } from "../models/notification.model.mjs";
import Inventory from "../models/inventory.model.mjs";
import { sendNotificationMail } from "./notification.util.mjs";
import { User } from "../models/user.model.mjs";

export const scanAndNotify = async () => {
  try {
    const inventories = await Inventory.find();

    for (const inventory of inventories) {
      const alerts = [];
      const lowStockItems = [];
      const expiringItems = [];
      for (const item of inventory.items) {
        // Low stock
        if (item.stock <= item.minimumCap) {
          alerts.push("Low Stock Alert");
          lowStockItems.push(item.medicineOrDrug + "|" + item.stock);
        }

        // Near expiry (within 30 days)
        const daysToExpire =
          (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24);
        if (daysToExpire <= 30) {
          expiringItems.push(
            item.medicineOrDrug + "|" + Math.ceil(daysToExpire)
          );
        }
      }
      
      const user = await User.findById(inventory.owner);
      // Store notification for low stock items
      if (lowStockItems.length > 0) {
        const message = "Low Stock Alert";
        console.log("lowStockItems: ", lowStockItems);

        const notification = new Notification({
          inventoryId: inventory._id,
          userId: inventory.owner,
          message,
          lowStockItems: lowStockItems,
          read: false,
          createdAt: new Date(),
        });
        await notification.save();
        await sendNotificationMail(user.email, notification);

        // console.log("low stock notification: ", notification);
      }

      // Store notification for expiring items
      if (expiringItems.length > 0) {
        const message = "Expiry Alert";
        const notification = new Notification({
          inventoryId: inventory._id,
          userId: inventory.owner,
          message,
          expiringItems: expiringItems,
          read: false,
          createdAt: new Date(),
        });
        await notification.save();
        console.log("user.email: ", user.email);        
        await sendNotificationMail(user.email, notification);
        // console.log("expiringItems notification: ", notification);
      }
    }

    console.log("Inventory scan completed.");
  } catch (err) {
    console.error("Scan failed:", err);
  }
};

// Run daily at 9 AM
cron.schedule("0 9 * * *", scanAndNotify);
