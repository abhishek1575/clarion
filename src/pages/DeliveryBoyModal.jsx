// // --- DeliveryBoyModal.jsx ---
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../components/ui/index";

// const DeliveryBoyModal = ({ onClose, onSelect }) => {
//   const [deliveryBoys, setDeliveryBoys] = useState([]);

//   useEffect(() => {
//     fetchDeliveryBoys();
//   }, []);

//   const fetchDeliveryBoys = async () => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const res = await axios.get(
//         "http://127.0.0.1:5000/runner/get_runner_list",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const freeBoys = res.data.filter((boy) => !boy.engaged);
//       setDeliveryBoys(freeBoys);
//     } catch (error) {
//       console.error("Failed to fetch delivery boys:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-lg font-bold mb-4">Select a Free Delivery Boy</h2>
//         {deliveryBoys.length > 0 ? (
//           <ul className="space-y-2">
//             {deliveryBoys.map((boy) => (
//               <li
//                 key={boy.id}
//                 className="border p-2 rounded hover:bg-gray-100 cursor-pointer"
//                 onClick={() => onSelect(boy.id)}
//               >
//                 <p className="font-medium">{boy.name}</p>
//                 <p className="text-sm text-gray-600">{boy.phone}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-500">No free delivery boys available.</p>
//         )}
//         <Button
//           onClick={onClose}
//           className="mt-4 w-full bg-red-500 hover:bg-red-600"
//         >
//           Close
//         </Button>
//       </div>
//     </div>
//   );
// };

// export { DeliveryBoyModal };

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
      onAssigned();
      onClose();
    } catch (error) {
      console.error("Error assigning delivery boy:", error);
    }
  };


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
// export default DeliveryBoyModal;
