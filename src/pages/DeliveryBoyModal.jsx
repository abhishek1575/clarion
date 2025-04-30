// components/DeliveryBoyModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/index";
import { API_URL } from "../config";

const DeliveryBoyModal = ({ orderId, onClose, onAssigned }) => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveryBoys = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        const response = await axios.get(
          `${API_URL}/runner/get_runner_list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const freeDeliveryBoys = response.data.filter((boy) => !boy.engaged);
        setDeliveryBoys(freeDeliveryBoys);
      } catch (error) {
        console.error("Error fetching delivery boys:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryBoys();
  }, []);

  const assignDeliveryBoy = async (deliveryBoyId) => {
    try {
      const token = sessionStorage.getItem("access_token");

      // Step 1: Assign the delivery boy
      await axios.post(
        `${API_URL}/runner/assign`,
        {
          order_id: orderId,
          runner_id: deliveryBoyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Step 2: Update the order status to "Out_for_delivery"
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        {
          status: "Out_for_delivery",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // After successful operations
      onAssigned();
      onClose();
    } catch (error) {
      console.error(
        "Error assigning delivery boy or updating order status:",
        error
      );
    }
  };

  // const assignDeliveryBoy = async (deliveryBoyId) => {
  //   try {
  //     const token = sessionStorage.getItem("access_token");
  //     await axios.post(
  //       `${API_URL}/runner/assign`,
  //       {
  //         order_id: orderId,
  //         runner_id: deliveryBoyId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     onAssigned();
  //     onClose();
  //   } catch (error) {
  //     console.error("Error assigning delivery boy:", error);
  //   }
  // };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-md w-full rounded-xl shadow-xl p-6 space-y-4 relative">
        <h2 className="text-xl font-semibold mb-4">Assign Delivery Boy</h2>
        {loading ? (
          <p>Loading delivery boys...</p>
        ) : deliveryBoys.length === 0 ? (
          <p>No available delivery boys at the moment.</p>
        ) : (
          <ul className="space-y-2">
            {deliveryBoys.map((boy) => (
              <li key={boy.id} className="flex justify-between items-center">
                <span>
                  {boy.name} ({boy.phone})
                </span>
                <Button onClick={() => assignDeliveryBoy(boy.id)}>
                  Assign
                </Button>
              </li>
            ))}
          </ul>
        )}
        <Button
          onClick={onClose}
          className="absolute top-2 right-4 bg-red-500 hover:bg-red-600"
        >
          ✕
        </Button>
      </div>
    </div>
  );
};
export { DeliveryBoyModal };
