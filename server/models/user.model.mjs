import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["Admin", "Pharmacist", "Healthcare Professional", "Vendor"],
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isPasswordReset: {
        type: Boolean,
        default: false,
    },
    gstNumber: {
        type: String,
        required: function () {
            return this.role === "Pharmacist" || this.role === "Vendor";
        },
        validate: {
            validator: function (value) {
                // GST validation regex for Indian GST numbers
                return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);
            },
            message: "Invalid GST Number",
        },
    },
}, {
    timestamps: true
});

export const User = mongoose.model("User", UserSchema);