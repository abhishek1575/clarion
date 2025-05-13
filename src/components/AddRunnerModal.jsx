// src/components/AddRunnerModal.jsx
import React, { useState } from "react";
import { API_URL } from "../config";

export default function AddRunnerModal({ onClose, onSuccess }) {
  const [runnerData, setRunnerData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleRunnerSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/runner/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(runnerData),
      });

      if (response.ok) {
        setRunnerData({ name: "", email: "", phone: "", password: "" });
        onSuccess();
        onClose();
      } else {
        console.error("Failed to register runner");
      }
    } catch (err) {
      console.error("Runner registration error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add Runner</h3>
        <form onSubmit={handleRunnerSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={runnerData.name}
            onChange={(e) =>
              setRunnerData({ ...runnerData, name: e.target.value })
            }
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={runnerData.email}
            onChange={(e) =>
              setRunnerData({ ...runnerData, email: e.target.value })
            }
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={runnerData.phone}
            onChange={(e) =>
              setRunnerData({ ...runnerData, phone: e.target.value })
            }
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={runnerData.password}
            onChange={(e) =>
              setRunnerData({ ...runnerData, password: e.target.value })
            }
            required
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Runner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
