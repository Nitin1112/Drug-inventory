import Inventory from "../models/inventory.model.mjs";
import MedicineAndDrug from "../models/medicine.model.mjs";

// Add a new medicine or drug
export const addMedicine = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const find_medicine = await MedicineAndDrug.findOne({ name: req.body.name });

        if (find_medicine) {
            return res.status(200).json({ error: `${req.body.type} already exists` });
        }

        const medicine = new MedicineAndDrug({ ...req.body, addedBy: user_id });
        const inventory = await Inventory.findOne({ owner: user_id })
        console.log(inventory.groupsAvailable);

        if (!inventory.groupsAvailable.includes(medicine.group)) { // TODO: group should be lower case
            inventory.groupsAvailable.push(medicine.group);
            await inventory.save();
        }
        const savedMedicine = await medicine.save();
        res.status(201).json({ message: "Medicine added successfully", data: savedMedicine });
    } catch (error) {
        res.status(500).json({ error: "Failed to add medicine", details: error.message });
    }
};

// Fetch all medicines and drugs
export const getMedicines = async (req, res) => {
    try {
        const medicines = await MedicineAndDrug.find({ addedBy: req.params.user_id });
        res.status(200).json({ data: medicines });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch medicines", details: error.message });
    }
};

// Fetch a specific medicine or drug by ID
export const getMedicineById = async (req, res) => {
    try {
        const { userId, medicineId } = req.params;

        let data = {
            stock: 0,
            lifetimeSales: 0,
            lifetimeSupply: 0,
        };

        const inventory = await Inventory.findOne({ owner: userId });
        const medicine = await MedicineAndDrug.findById(medicineId);
        if (!medicine) return res.status(404).json({ error: "Medicine not found" });
        if (!inventory) {
            data = {
                stock: 0,
                lifetimeSales: 0,
                lifetimeSupply: 0,
            };
        } else {
            for (const item of inventory.medicines) {
                if (item.medicineOrDrug.toString() == medicine._id.toString()) {
                    data = {
                        stock: item.stock ? item.stock : 0,
                        lifetimeSupply: item.lifetimeSupply ? item.lifetimeSupply : 0,
                        lifetimeSales: item.lifetimeSales ? item.lifetimeSales : 0,
                    }
                }
            }
        }

        res.status(200).json({ data: { ...data, ...medicine._doc } });
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
