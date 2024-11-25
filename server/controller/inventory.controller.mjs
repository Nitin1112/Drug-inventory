import Inventory from "../models/inventory.model.mjs";

// Add an item to the inventory
export const addInventoryItem = async (req, res) => {
    try {
        const inventoryItem = new Inventory({ ...req.body, addedBy: req.user._id });
        const savedInventoryItem = await inventoryItem.save();
        res.status(201).json({ message: "Inventory item added successfully", data: savedInventoryItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to add inventory item", details: error.message });
    }
};

// Fetch all inventory items for the logged-in user
export const getInventory = async (req, res) => {
    try {
        const inventoryItems = await Inventory.find({ addedBy: req.user._id }).populate('medicineId', 'name generic_name');
        res.status(200).json({ data: inventoryItems });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch inventory", details: error.message });
    }
};

// Fetch a specific inventory item by ID
export const getInventoryItemById = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id).populate('medicineId', 'name generic_name');
        if (!inventoryItem) return res.status(404).json({ error: "Inventory item not found" });
        res.status(200).json({ data: inventoryItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch inventory item", details: error.message });
    }
};

// Update quantity or batch details of a specific inventory item
export const updateInventoryItem = async (req, res) => {
    try {
        const updatedInventoryItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInventoryItem) return res.status(404).json({ error: "Inventory item not found" });
        res.status(200).json({ message: "Inventory item updated successfully", data: updatedInventoryItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to update inventory item", details: error.message });
    }
};

// Remove an item from the inventory
export const deleteInventoryItem = async (req, res) => {
    try {
        const deletedInventoryItem = await Inventory.findByIdAndDelete(req.params.id);
        if (!deletedInventoryItem) return res.status(404).json({ error: "Inventory item not found" });
        res.status(200).json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete inventory item", details: error.message });
    }
};
