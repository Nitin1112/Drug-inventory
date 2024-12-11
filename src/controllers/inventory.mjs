import axios from "axios";
import { client_config } from "../../client.config.mjs";

export const addMedicineToInventory = async (medicineId, stock) => {
    try {
        console.log(medicineId);
        console.log(stock);

        const userId = localStorage.getItem('userId');
        const newMedicine = {
            userId: userId,
            medicineId: medicineId,
            stock: stock,
        }
        console.log(newMedicine);

        const response = await axios.post(
            `${client_config.backend_url}/api/inventory/add`,
            newMedicine,
        );

        if (response.data.error) {
            return { error: response.data.error }
        }

        return { message: response.data };
    } catch (error) {
        return { error: error.message }
    }
}

export const inventoryUpdateStock = async (medicineId, stock) => {
    try {
        const userId = localStorage.getItem('userId');
        const updateData = {
            stock: stock,
            medicineId: medicineId,
        }
        const response = await axios.put(
            `${client_config.backend_url}/api/inventory/update/stock/${userId}`,
            updateData
        );

        if (response.data.error) {
            return { error: response.data.error };
        }


        return { data: response.data.data };
    } catch (error) {
        return { error: error.message };
    }
}

export const fetchInventoryItems = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${client_config.backend_url}/api/inventory/items/${userId}`);

        if (response.data.error) {
            return { error: response.data.error };
        }


        return { data: response.data.data };
    } catch (error) {
        return { error: error.message };
    }
}

export const fetchAvailableMedicines = async () => {
    try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${client_config.backend_url}/api/inventory/items/${userId}`);

        if (response.data.error) {
            return { error: response.data.error };
        }

        return { data: response.data.data };
    } catch (error) {
        return { error: error.message };
    }
}
