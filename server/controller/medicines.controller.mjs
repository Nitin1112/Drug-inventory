import MedicineAndDrug from "../models/medicine.model.mjs";

// Add a new medicine or drug
export const addMedicine = async (req, res) => {
    try {
        const medicine = new MedicineAndDrug({ ...req.body, addedBy: req.user._id });
        const savedMedicine = await medicine.save();
        res.status(201).json({ message: "Medicine added successfully", data: savedMedicine });
    } catch (error) {
        res.status(500).json({ error: "Failed to add medicine", details: error.message });
    }
};

// Fetch all medicines and drugs
export const getMedicines = async (req, res) => {
    try {
        const medicines = await MedicineAndDrug.find({ addedBy: req.user._id });
        res.status(200).json({ data: medicines });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch medicines", details: error.message });
    }
};

// Fetch a specific medicine or drug by ID
export const getMedicineById = async (req, res) => {
    try {
        const medicine = await MedicineAndDrug.findById(req.params.id);
        if (!medicine) return res.status(404).json({ error: "Medicine not found" });
        res.status(200).json({ data: medicine });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch medicine", details: error.message });
    }
};

// Update details of a specific medicine or drug
export const updateMedicine = async (req, res) => {
    try {
        const updatedMedicine = await MedicineAndDrug.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMedicine) return res.status(404).json({ error: "Medicine not found" });
        res.status(200).json({ message: "Medicine updated successfully", data: updatedMedicine });
    } catch (error) {
        res.status(500).json({ error: "Failed to update medicine", details: error.message });
    }
};

// Delete a medicine or drug
export const deleteMedicine = async (req, res) => {
    try {
        const deletedMedicine = await MedicineAndDrug.findByIdAndDelete(req.params.id);
        if (!deletedMedicine) return res.status(404).json({ error: "Medicine not found" });
        res.status(200).json({ message: "Medicine deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete medicine", details: error.message });
    }
};
