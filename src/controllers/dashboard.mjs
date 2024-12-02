import axios from "axios";
import { client_config } from "../../client.config.mjs";

export const fetch_dashboard_data = async () => {
    try {
        const userId = localStorage.getItem("userId"); // Fetch userId from localStorage
        const response = await axios.get(`${client_config.backend_url}/api/inventory/${userId}/dashboard`);

        if (response.data.error) {
            return { inventoryStatus: false };
        }

        return { inventoryStatus: true, ...response.data };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return { error: "unable to fetch dashboard data" };
    }
}

export const generate_dashboard_review = async () => {

}