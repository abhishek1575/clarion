import { API_URL } from "../config";


export const fetchAllUsers = async (token) => {
  // const response = await fetch("http://172.25.10.26:5000/admin/users", {
    const response = await fetch(`${API_URL}/admin/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.users;
};

export const updateUserStatus = async (userId, isActive, token) => {
  const response = await fetch(
    // `http://172.25.10.26:5000/admin/users/${userId}/status`,
    `${API_URL}/admin/users/${userId}/status`,  
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update user status");
  }

  return await response.json();
};
