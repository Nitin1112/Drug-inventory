import { Notification } from "../models/notification.model.mjs";

export const getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });
    if (!notifications) {
      return res.status(404).json({ message: "No notifications found" });
    }
    console.log("Fetched notifications: ", notifications);

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const readNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    notification.status = "Read";
    notification.type = "normal";

    await notification.save();
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNotificationCountById = async (req, res) => {
  const { userId } = req.params;
  try {
    const notification = await Notification.find({ userId: userId, status: "Unread" });
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.status(200).json({ data: notification.length });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
