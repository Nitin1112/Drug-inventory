import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
    {
        receiptNumber: {
            type: String,
            required: true,
            unique: true, // To ensure each receipt has a unique number
        },
        customerName: {
            type: String,
            required: true,
        },
        customerContact: {
            type: String,
        },
        items: [
            {
                medicineId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Medicine", // Reference to the medicine model
                    required: true,
                },
                medicineName: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
                total: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "Card", "Online"],
            required: true,
        },
        dateOfPurchase: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Receipt = mongoose.model("Receipt", receiptSchema);

export default Receipt;
