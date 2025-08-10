import axios from "axios";
import { client_config } from "../../client.config.mjs";

export const fetchAndSetUser = async () => {
    const userId = localStorage.getItem("userId");
    try {
        const response = await axios.get(`${client_config.backend_url}/api/user/${userId}`);

        if (response.error) {
            return { error: response.error };
        }
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        return { status: true };
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}