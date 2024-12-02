import axios from "axios";
import { client_config } from "../../client.config.mjs";

export const fetch_all_medicine = async () => {
    try {
        console.log("Fetching Resources");
        const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
        const response = await axios.get(`${client_config.backend_url}/api/medicines/${userId}`);

        if (response.data.error) {
            return { error: response.data.error };
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching medicine data:", error);
        return { error: "unable to fetch medicine data" };
    }
}

export const fetch_groups_available = async () => {
    try {
        const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
        const response = await axios.get(`${client_config.backend_url}/api/inventory/${userId}/groups`);

        if (response.data.error) {
            return { error: response.data.error };
        }

        return response.data;
    } catch (error) {
        console.error("Error fetching medicine data:", error);
        return { error: "unable to fetch medicine data" };
    }
}

export const validateMedicineData = (medicineData) => {
    const optionalFields = ["genericName", "description", "sideEffects"];

    for (var field in medicineData) {
        if (!optionalFields.includes(field) && (medicineData[field] === '' || medicineData[field] === undefined)) {
            return false;
        }
    }
    return true;
}

export const addNewMedicineData = async (medicineData) => {
    try {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(
            `${client_config.backend_url}/api/medicines/add`,
            { user_id: userId, ...medicineData }
        );
        if (response.data.error) {
            return { error: response.data.error };
        }
        return { message: response.data.message }
    } catch (error) {
        console.log("Error fetching medicine data:", error);
        return { error: "unable to fetch medicine data" };
    }
}

export const fetchMedicineDataById = async (id) => {
    try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`${client_config.backend_url}/api/medicines/single/${userId}/${id}`,);

        if (response.data.error) {
            return { error: response.data.error };
        }
        return { data: response.data.data }
    } catch (error) {
        console.log("Error fetching medicine data:", error);
        return { error: "unable to fetch medicine data" };
    }

}
