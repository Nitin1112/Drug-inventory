import express from "express";
import { addMedicine, getMedicines, getMedicineById, updateMedicine, deleteMedicine } from "../controller/medicines.controller.mjs";

const medicinesRouter = express.Router();

// Add a new medicine or drug
medicinesRouter.post("/add", addMedicine);

// Fetch all medicines and drugs
medicinesRouter.get("/:user_id", getMedicines);

// Fetch a specific medicine or drug by ID
medicinesRouter.get("/single/:userId/:medicineId", getMedicineById);

// Update details of a specific medicine or drug
medicinesRouter.put("/:id", updateMedicine);

// Delete a medicine or drug
medicinesRouter.delete("/:id", deleteMedicine);

export default medicinesRouter;
