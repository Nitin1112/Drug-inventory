import axios from "axios";
import { client_config } from "../../client.config.mjs";

const API_BASE_URL = client_config.ai_url + "/api/chat";

export const chat = async (message) => {
  try {
    const userId = localStorage.getItem("userId");
    const data = {
      message: message,
      userId: userId,
    };
    console.log(data)
    const response = await axios.post(`${API_BASE_URL}`, data);
    console.log(response);
    if (response.data.error) {
      return { error: response.data.error };
    }
    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
};
