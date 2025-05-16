import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Owner of the inventory
    groupsAvailable: { type: Array },
    medicines: [
      {
        medicineOrDrug: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MedicineAndDrug",
          required: true,
        }, // Medicine/Drug reference
        stock: { type: Number, required: true },
        lifetimeSupply: { type: Number, default: 0 },
        lifetimeSales: { type: Number, default: 0 },
      },
    ],
    items: [
      {
        medicineOrDrug: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MedicineAndDrug",
          required: true,
        }, // Medicine/Drug reference
        price: { type: Number, required: true },
        manufacturer: { type: String },
        expiryDate: { type: Date },
        minimumCap: { type: Number, default: 10 },
        stock: { type: Number, required: true },
        batchNumber: { type: String },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
