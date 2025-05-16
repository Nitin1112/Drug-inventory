import axios from "axios";
import { client_config } from "../../client.config.mjs";

const API_BASE_URL = client_config.backend_url + "/api/notification";

export const getAllNotification = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${API_BASE_URL}/${userId}`);
    if (response.data.error) {
      return { error: response.data.error };
    }
    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const readNotification = async (notificationId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${notificationId}/read`);
    if (response.data.error) {
      return { error: response.data.error };
    }
    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const getUnreadNotificationCount = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(`${API_BASE_URL}/${userId}/unread`);
    if (response.data.error) {
      return { error: response.data.error };
    }
    return { data: response.data };
  } catch (error) {
    return { error: error.message };
  }
}
