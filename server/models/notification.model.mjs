import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    inventoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Unread", "Read"],
        default: "Unread",
    },
    lowStockItems: {
        type: [String],
        default: [],
    },
    expiringItems: {
        type: [String],
        default: [],
    },
    type: {
        type: String,
        enum: ["warning", "success", "danger", "info", "normal"],
        default: "warning",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Notification = mongoose.model("Notification", NotificationSchema);
