import express from "express";
import {
  getNotifications,
  deleteNotification,
  readNotification,
  getNotificationCountById,
} from "../controller/notification.controller.mjs";

const notificationRouter = express.Router();

notificationRouter.get("/:userId", getNotifications);
notificationRouter.put("/:id/read", readNotification);
notificationRouter.get("/:userId/unread", getNotificationCountById);
notificationRouter.delete("/:id", deleteNotification);

export default notificationRouter;
