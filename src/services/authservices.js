
import axios from "axios";
import { API_URL } from "../config";

const Base_URL = `${API_URL}/auth`; // ✅ Use const (or let), not just assignment

// Register User Function
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${Base_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${Base_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
    });

    const { access_token, user } = response.data;

    // Store login data in session storage
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("name", user.name);
    sessionStorage.setItem("id", user.id);
    sessionStorage.setItem("role", user.role);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};


// export const loginUser = async (userData) => {
//   try {
//     const response = await axios.post(`${Base_URL}/login`, userData, {
//       // ✅ Fixed variable name: Base_URL (not Base_URLs)
//       headers: { "Content-Type": "application/json" },
//     });

//     const { access_token, user } = response.data;

//     // Store login data in session storage
//     sessionStorage.setItem("access_token", access_token);
//     sessionStorage.setItem("email", user.email);
//     sessionStorage.setItem("name", user.name);
//     sessionStorage.setItem("id", user.id);
//     sessionStorage.setItem("role", user.role);

//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "Login failed" };
//   }
// };
