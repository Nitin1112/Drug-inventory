import axios from "axios";
import { client_config } from "../../client.config.mjs";
import { useNavigate } from "react-router-dom";

export const addMedicineToInventory = async (medicineData) => {
  try {
    const userId = localStorage.getItem("userId");

    const response = await axios.post(
      `${client_config.backend_url}/api/inventory/add`,
      {
        userId: userId,
        ...medicineData,
      }
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    return { message: response.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const inventoryUpdateStock = async (updatedMedicine) => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.put(
      `${client_config.backend_url}/api/inventory/update/medicine/stock/${userId}`,
      updatedMedicine
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    return { data: response.data.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const updateStockOfItem = async (medicineData) => {
  try {
    // const 
  } catch (error) {
    return { error: error.message };
  }
}

export const fetchInventoryStockItemById = async (medId, batchNumber) => {
  try {

    const userId = localStorage.getItem("userId");
    const medData = {
      medId: medId,
      batchNumber: batchNumber,
    }
    if (userId == null) {
      return;
    }

    console.log(medData);
    
    const response = await axios.post(`${client_config.backend_url}/api/inventory/medicine/${userId}`,
      medData
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
}

export const fetchInventoryItems = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${client_config.backend_url}/api/inventory/items/${userId}`
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    return { data: response.data.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const fetchAvailableMedicines = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${client_config.backend_url}/api/inventory/items/${userId}`
    );

    if (response.data.error) {
      return { error: response.data.error };
    }

    return { data: response.data.data };
  } catch (error) {
    return { error: error.message };
  }
};
