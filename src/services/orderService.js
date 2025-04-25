// services/orderService.js
import axios from "axios";
import { API_URL } from "../config"; // Adjust the import based on your project structure

const BASE_URL = `${API_URL}`;
const getToken = () => sessionStorage.getItem("access_token");

export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/get_all_orders`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch orders: " + error.message);
  }
};

export const getOrderDetailsById = async (orderId) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch order details: " + error.message);
  }
};
