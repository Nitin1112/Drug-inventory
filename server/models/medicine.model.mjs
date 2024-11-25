import mongoose from "mongoose";

const medicineAndDrugSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        genericName: { type: String },
        type: { type: String, enum: ["Medicine", "Drug"], required: true }, // Differentiates medicine and drug
        category: { type: String },
        manufacturer: { type: String },
        description: { type: String },
        strength: { type: String }, // e.g., 500mg, 10mg/ml
        form: { type: String }, // e.g., tablet, syrup
        price: { type: Number, required: true },
        expiryDate: { type: Date, required: true },
        requiresPrescription: { type: Boolean, required: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who added
    },
    { timestamps: true }
);

const MedicineAndDrug = mongoose.model("MedicineAndDrug", medicineAndDrugSchema);
export default MedicineAndDrug;
