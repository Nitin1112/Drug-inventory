import express from "express";
import { addInventoryItem, getInventory, getInventoryItemById, updateInventoryItem, deleteInventoryItem } from "../controller/inventory.controller.mjs"

const inventoryRouter = express.Router();

// Add an item to the inventory
inventoryRouter.post("/add", addInventoryItem);

// Fetch all inventory items for the logged-in user
inventoryRouter.get("/", getInventory);

// Fetch a specific inventory item by ID
inventoryRouter.get("/:id", getInventoryItemById);

// Update quantity or batch details of a specific inventory item
inventoryRouter.put("/:id", updateInventoryItem);

// Remove an item from the inventory
inventoryRouter.delete("/:id", deleteInventoryItem);

export default inventoryRouter;
