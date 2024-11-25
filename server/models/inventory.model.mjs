import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner of the inventory
        items: [
            {
                medicineOrDrug: { type: mongoose.Schema.Types.ObjectId, ref: "MedicineAndDrug", required: true }, // Medicine/Drug reference
                quantity: { type: Number, required: true },
                batchNumber: { type: String }, // Optional batch tracking
                addedAt: { type: Date, default: Date.now },
            },
        ],
    },
    { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
