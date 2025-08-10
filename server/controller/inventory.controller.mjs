import Inventory from "../models/inventory.model.mjs";
import MedicineAndDrug from "../models/medicine.model.mjs";

// Add an item to the inventory
export const addInventoryItem = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);

    if (!data) {
      return res.status(200).json({ error: "No data provided" });
    }
    if (!data.userId) {
      return res.status(200).json({ error: "Required user id" });
    }
    if (!data.medicineId) {
      return res.status(200).json({ error: "Required medicine id" });
    }
    if (!data.stock) {
      return res.status(200).json({ error: "Required number of stocks" });
    }
    if (!data.expiryDate) {
      return res.status(200).json({ error: "Required expiry date" });
    }
    if (!data.batchNumber) {
      return res.status(200).json({ error: "Required batch number" });
    }
    if (!data.manufacturer) {
      return res.status(200).json({ error: "Required manufacturer" });
    }
    if (!data.price) {
      return res.status(200).json({ error: "Required price" });
    }

    const inventory = await Inventory.findOne({ owner: data.userId });
    if (!inventory) {
      return res.status(200).json({ error: "Inventory not found" });
    }

    const medicine = await MedicineAndDrug.findById(data.medicineId);
    // console.log(medicine);

    if (!medicine) {
      return res.status(200).json({ error: "Medicine not found" });
    }

    // Checking if the item already exists in the inventory with same batch number
    for (const item of inventory.items) {
      console.log("item.medicineOrDrug: ", item.medicineOrDrug);
      if (item.medicineOrDrug.toString() === medicine._id.toString()) {
        if (item.batchNumber === data.batchNumber) {
          return res
            .status(200)
            .json({ error: "Item with this Batch number already exists" });
        }
      }
    }
    try {
      const newItem = {
        medicineOrDrug: medicine._id,
        stock: data.stock,
        batchNumber: data.batchNumber,
        manufacturer: data.manufacturer,
        price: data.price,
        expiryDate: data.expiryDate ? data.expiryDate.split('T')[0] : '',
      };
      inventory.items.push(newItem);
      await inventory.save();
      // return res.status(201).json({
      //     message: "Inventory item updated successfully",
      //     data: medicine._id,
      // });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to update inventory",
        error: error.message,
      });
    }

    for (const item of inventory.medicines) {
      console.log(item.medicineOrDrug);

      // Ensure proper comparison for MongoDB ObjectIDs
      if (item.medicineOrDrug.toString() === medicine._id.toString()) {
        item.lifetimeSupply = item.lifetimeSupply + data.stock;
        item.stock = item.stock + data.stock;

        try {
          await inventory.save();
          return res.status(201).json({
            message: "Inventory item updated successfully",
            data: medicine._id,
          });
        } catch (error) {
          return res.status(500).json({
            message: "Failed to update inventory",
            error: error.message,
          });
        }
      }
    }
    const newMedicine = {
      medicineOrDrug: medicine._id,
      stock: data.stock,
      lifetimeSupply: data.stock,
      lifetimeSales: 0,
    };
    inventory.medicines.push(newMedicine);
    await inventory.save();
    return res.status(201).json({
      message: "Inventory item added successfully",
      data: medicine._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to add inventory item", details: error.message });
  }
};

// Fetch all inventory items for the logged-in user
export const getInventory = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find({
      addedBy: req.user._id,
    }).populate("medicineId", "name generic_name");
    res.status(200).json({ data: inventoryItems });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch inventory", details: error.message });
  }
};

// Fetch a specific inventory item by ID
export const getInventoryItemById = async (req, res) => {
  try {
    const inventoryItem = await Inventory.findById(req.params.id).populate(
      "medicineId",
      "name generic_name"
    );
    if (!inventoryItem)
      return res.status(200).json({ error: "Inventory item not found" });
    res.status(200).json({ data: inventoryItem });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch inventory item",
      details: error.message,
    });
  }
};

export const getInventoryMedicineById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { medId, batchNumber } = req.body
    console.log(req.params);
    console.log(req.body);


    const inventory = await Inventory.findOne({
      owner: userId,
    });
    if (!inventory) {
      return res.status(200).json({ error: "Inventory not found" });
    }

    let medicine;
    for (const item of inventory.medicines) {
      if (item.medicineOrDrug.toString() === medId) {
        medicine = item;
      }
    }
    for (const item of inventory.items) {
      if (item.medicineOrDrug.toString() === medId) {
        if (item.batchNumber === batchNumber) {
          if (medicine) {
            console.log(item.expiryDate);

            return res.status(200).json(item);
          }
        }
      }
    }

    return res.status(404).json({ error: "Medicine not found" });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to get inventory item",
      details: error.message,
    });
  }
}

// Update quantity or batch details of a specific inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateMedicineData = req.body;
    const inventory = await Inventory.findOne({
      owner: userId,
    });
    if (!inventory) {
      return res.status(200).json({ error: "Inventory not found" });
    }

    let medicine;
    for (const item of inventory.medicines) {
      if (item.medicineOrDrug.toString() === updateMedicineData.id) {
        medicine = item;
      }
    }
    for (const item of inventory.items) {
      if (item.medicineOrDrug.toString() === updateMedicineData.id) {
        if (item.batchNumber === updateMedicineData.batchNumber) {
          if (medicine) {
            console.log("item.stock", item.stock);
            medicine.stock = updateMedicineData.stock;
            medicine.lifetimeSupply =
              medicine.lifetimeSupply - item.stock + updateMedicineData.stock;
          }
          item.stock = updateMedicineData.stock ? updateMedicineData.stock : item.stock;
          item.expiryDate = updateMedicineData.expiryDate ? updateMedicineData.expiryDate : item.expiryDate;
          item.manufacturer = updateMedicineData.manufacturer ? updateMedicineData.manufacturer : item.manufacturer;
          item.price = updateMedicineData.price ? updateMedicineData.price : item.price;

          await inventory.save();
          return res.status(200).json({
            message: "Inventory item updated successfully",
            data: item,
            lifetimeSupply: medicine.lifetimeSupply,
          });
        }
      }
    }
    return res.status(404).json({ error: "Item not found" });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to update inventory item",
      details: error.message,
    });
  }
};

// Remove an item from the inventory
export const deleteInventoryItem = async (req, res) => {
  try {
    const deletedInventoryItem = await Inventory.findByIdAndDelete(
      req.params.id
    );
    if (!deletedInventoryItem)
      return res.status(200).json({ error: "Inventory item not found" });
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete inventory item",
      details: error.message,
    });
  }
};

// Fetch Total Number of Medicines in Inventory
export const getTotalMedicines = async (req, res) => {
  try {
    const { userId } = req.params; // User's ObjectId from request params
    const inventory = await Inventory.findOne({ owner: userId }).populate(
      "items.medicineOrDrug"
    );

    if (!inventory)
      return res.status(200).json({ error: "Inventory not found" });

    const totalMedicines = inventory.items.filter(
      (item) => item.medicineOrDrug.type === "Medicine"
    ).length;

    res.status(200).json({ totalMedicines });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch Total Number of Drugs in Inventory
export const getTotalDrugs = async (req, res) => {
  try {
    const { userId } = req.params;
    const inventory = await Inventory.findOne({ owner: userId }).populate(
      "items.medicineOrDrug"
    );

    if (!inventory)
      return res.status(200).json({ error: "Inventory not found" });

    const totalDrugs = inventory.items.filter(
      (item) => item.medicineOrDrug.type === "Drug"
    ).length;

    res.status(200).json({ totalDrugs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Frequently Bought Items (Mock Data for Now)
export const getFrequentlyBoughtItems = async (req, res) => {
  try {
    // Mock data as you mentioned advanced queries are not needed
    const frequentlyBoughtItem = "Paracetamol 500mg"; // Example item

    res.status(200).json({ frequentlyBoughtItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Common Dashboard Endpoint
export const getDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the inventory for the user
    const inventory = await Inventory.findOne({ owner: userId }).populate(
      "items.medicineOrDrug"
    );

    if (!inventory)
      return res.status(200).json({ error: "Inventory not found" });

    // Total medicines and drugs calculation
    const totalMedicines = inventory.items.filter(
      (item) => item.medicineOrDrug.type === "Medicine"
    ).length;
    const totalDrugs = inventory.items.filter(
      (item) => item.medicineOrDrug.type === "Drug"
    ).length;

    // Aggregated Data
    const totalItems = inventory.items.length;

    //
    const availableMedicineGroups = inventory.items.length;

    // Fetch frequently bought item (mocked for now)
    const frequentlyBoughtItem = "Paracetamol 500mg";

    // Mocked quick report
    const quickReport = {
      medicinesSold: 70856,
      invoicesGenerated: 5288,
    };

    // Mocked pharmacy details
    const myPharmacy = {
      totalSuppliers: 4,
      totalUsers: 5,
    };

    // Mocked customers data
    const customers = {
      totalCustomers: 845,
    };

    res.status(200).json({
      inventoryStatus: totalItems > 0 ? "Good" : "Low", // Simplified status check
      totalMedicines,
      totalDrugs,
      totalItems,
      frequentlyBoughtItem,
      quickReport,
      myPharmacy,
      customers,
      availableMedicineGroups,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailableMedicineGroups = async (req, res) => {
  try {
    const user_id = req.params.userId;
    const inventory = await Inventory.findOne({ owner: user_id });

    if (!inventory) {
      return res.status(404).json({ error: "Inventory Not Found" });
    }

    const availableGroups = inventory.groupsAvailable;

    return res.status(200).json({ data: availableGroups });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getInventoryItems = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId || userId == "") {
      return res.status(200).json({ error: "Invalid user id" });
    }

    const inventory = await Inventory.findOne({ owner: userId });
    if (!inventory) {
      return res.status(404).json({ error: "Inventory not found" });
    }

    let inventoryItems = [];
    for (const medicineId of inventory.items) {
      const medicine = await MedicineAndDrug.findById(
        medicineId.medicineOrDrug
      );

      inventoryItems.push({ ...medicineId._doc, ...medicine._doc });
    }

    return res.status(200).json({ data: inventoryItems });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
