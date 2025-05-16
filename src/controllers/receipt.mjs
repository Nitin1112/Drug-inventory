import axios from 'axios';
import { client_config } from '../../client.config.mjs';

const API_BASE_URL = client_config.backend_url + '/api/receipts';

// Get today's receipts
export const getReceipts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-today`);
        if (response.data.error) {
            return { error: response.data.error };
        }
        console.log(response.data);
        
        return { data: response.data };
    } catch (error) {
        return { error: error.message };
    }
};

// Get a single receipt by Number
export const getReceiptByNumber = async (receiptNumber) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${receiptNumber}`);
        if (response.data.error) {
            return { error: response.data.error };
        }
        return { data: response.data };
    } catch (error) {
        return { error: error.message };
    }
};

// Create a new receipt
export const createReceipt = async (receiptData) => {
    try {
        const userId = localStorage.getItem('userId');
        const finalReceiptData = {
            userId: userId,
            ...receiptData,
        };
        console.log('Creating receipt with data:', finalReceiptData);

        const response = await axios.post(`${API_BASE_URL}/create`, finalReceiptData);
        if (response.data.error) {
            return { error: response.data.error };
        }
        return { data: response.data };
    } catch (error) {
        return { error: error.message };
    }
};

export const getReceiptsByDate = async (date) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/get-by-date`, {
            params: { date }
        });
        if (response.data.error) {
            return { error: response.data.error };
        }
        return { data: response.data };
    } catch (error) {
        return { error: error.message };
    }
};