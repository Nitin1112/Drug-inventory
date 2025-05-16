import Inventory from "../models/inventory.model.mjs";
import Receipt from "../models/receipt.model.mjs";

const generateReceiptNumber = async () => {
  const now = new Date();
  const baseReceiptNumber = `REC${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now
    .getHours()
    .toString()
    .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  // Fetch the last count from the database
  const lastReceipt = await Receipt.findOne().sort({ createdAt: -1 });
  let lastCount = lastReceipt
    ? parseInt(lastReceipt.receiptNumber.slice(-6))
    : 0;

  // Increment the count
  const newCount = (lastCount + 1).toString().padStart(6, "0");

  // Combine base receipt number with incremented count
  return `${baseReceiptNumber}${newCount}`;
};

const updateSalesStocks = async (items, inventory) => {
  try {
    for (const item of items) {
      for (const inventoryItem of inventory.items) {
        // console.log("Inventory Item", inventoryItem.medicineOrDrug.toString());
        // console.log("Item", item.medicineId);
        // console.log("");
        
        if (inventoryItem.medicineOrDrug.toString() === item.medicineId) {
          inventoryItem.stock -= item.quantity;
        }
      }
      for (const inventoryMedicine of inventory.medicines) {
        if (inventoryMedicine.medicineOrDrug.toString() === item.medicineId) {
          inventoryMedicine.stock -= item.quantity;
          inventoryMedicine.lifetimeSales += item.quantity;
        }
      }
    }
    await inventory.save();
    return inventory;
  } catch (error) {
    console.log("Error updating inventory stocks:", error.message);
    // console.error("Error updating inventory stocks:", error);
    // throw new Error("Failed to update inventory stocks");
  }
};

export const createReceipt = async (req, res) => {
  try {
    const receiptNumber = await generateReceiptNumber();
    const { userId, customer, receipt, paymentMethod } = req.body;
    // console.log(receipt);

    const inventory = await Inventory.findOne({ owner: userId });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    const refinedItems = [];
    for (let index = 0; index < receipt.items.length; index++) {
      const item = receipt.items[index];
      // console.log("item", item);

      const refinedItem = {
        medicineNo: item.itemNo,
        medicineId: item.itemId,
        medicineName: item.itemName,
        quantity: item.quantity,
        price: item.amountPerItem,
        total: item.amount,
      };
      refinedItems.push(refinedItem);
    }

    // Update the inventory stock
    const inv = await updateSalesStocks(refinedItems, inventory);
    // console.log("Updated Inventory", inv);
    

    const newReceipt = new Receipt({
      receiptNumber,
      customerName: customer.customerName,
      customerContact: customer.customerContact,
      items: refinedItems,
      subTotalAmount: receipt.subTotalAmount,
      totalAmount: receipt.totalAmount,
      tax: receipt.tax,
      paymentMethod: paymentMethod,
    });
    // console.log("Final Receipt", newReceipt);

    await newReceipt.save();
    res
      .status(201)
      .json({ message: "Receipt created successfully", receipt: newReceipt });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create receipt", error: error.message });
  }
};

export const getReceiptsToday = async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );

    const receipts = await Receipt.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    res.status(200).json({ receipts });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve today's receipts",
      error: error.message,
    });
  }
};

export const getReceiptByReceiptNumber = async (req, res) => {
  try {
    const { receiptNumber } = req.params;
    const receipt = await Receipt.findOne({ receiptNumber });
    if (!receipt) {
      return res.status(404).json({ message: "Receipt not found" });
    }
    res.status(200).json({ receipt });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve receipt", error: error.message });
  }
};

export const getReceiptsByDate = async (req, res) => {
  try {
    const { date } = req.query; // Expecting 'YYYY-MM-DD'
    if (!date) {
      return res
        .status(400)
        .json({ message: "Date query parameter is required" });
    }
    const [year, month, day] = date.split("-").map(Number);
    const startOfDay = new Date(year, month - 1, day);
    const endOfDay = new Date(year, month - 1, day + 1);

    const receipts = await Receipt.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    res.status(200).json({ receipts });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve receipts by date",
      error: error.message,
    });
  }
};
