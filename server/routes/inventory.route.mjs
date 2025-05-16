import express from "express";
import {
    addInventoryItem,
    getInventory,
    getInventoryItemById,
    updateInventoryItem,
    deleteInventoryItem,
    getDashboardData,
    getFrequentlyBoughtItems,
    getTotalDrugs,
    getTotalMedicines,
    getAvailableMedicineGroups,
    getInventoryItems,
} from "../controller/inventory.controller.mjs"

const inventoryRouter = express.Router();

// Add an item to the inventory
inventoryRouter.post("/add", addInventoryItem);

// Fetch all inventory items for the logged-in user
inventoryRouter.get("/", getInventory);

inventoryRouter.get("/items/:userId", getInventoryItems);

// Fetch a specific inventory item by ID
inventoryRouter.get("/:id", getInventoryItemById);

// Update quantity or batch details of a specific inventory item
inventoryRouter.put("/update/medicine", updateInventoryItem);

// Remove an item from the inventory
inventoryRouter.delete("/:id", deleteInventoryItem);

// Endpoint for fetching total medicines
inventoryRouter.get("/:userId/total-medicines", getTotalMedicines);

// Endpoint for fetching total drugs
inventoryRouter.get("/:userId/total-drugs", getTotalDrugs);

// Endpoint for fetching frequently bought items
inventoryRouter.get("/:userId/frequently-bought-items", getFrequentlyBoughtItems);

// Common Dashboard Endpoint
inventoryRouter.get("/:userId/dashboard", getDashboardData);

// Get Available Groups
inventoryRouter.get("/:userId/groups", getAvailableMedicineGroups);

export default inventoryRouter;
