import express from "express";
import { createReceipt, getReceiptByReceiptNumber, getReceiptsToday, getReceiptsByDate } from "../controller/receipt.controller.mjs";

const receiptRouter = express.Router();

// Route for receipt creation and retrieval
receiptRouter.post("/create", createReceipt);
receiptRouter.get("/get-today", getReceiptsToday);
receiptRouter.get("/get-by-date", getReceiptsByDate);
receiptRouter.get("/:receiptNumber", getReceiptByReceiptNumber);


export default receiptRouter;
