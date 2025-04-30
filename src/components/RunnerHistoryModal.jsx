import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import OrderDetailsModal from "./OrderDetailsModal"; // Import the OrderDetailsModal

const RunnerHistoryModal = ({ runner, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order details

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        const res = await fetch(`${API_URL}/runner/${runner.id}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch history");
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [runner.id]);

  // Handle opening the OrderDetailsModal
  const handleOrderClick = async (orderId) => {
    try {
      const token = sessionStorage.getItem("access_token");
      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch order details");
      const data = await res.json();
      setSelectedOrder(data); // Set selected order details
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-teal-700">
              Delivery History of {runner.name}
            </h2>
            <button
              className="text-gray-500 hover:text-red-600 text-2xl"
              onClick={onClose}
            >
              &times;
            </button>
          </div>

          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Loading history...
            </div>
          ) : history.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No delivery history found.
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[65vh]">
              <table className="min-w-full text-sm border rounded-xl overflow-hidden shadow">
                <thead className="bg-teal-100 text-teal-800 font-semibold">
                  <tr>
                    <th className="p-3 border">Order ID</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Created</th>
                    <th className="p-3 border">Assigned</th>
                    <th className="p-3 border">Picked</th>
                    <th className="p-3 border">Delivered</th>
                    <th className="p-3 border">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, i) => (
                    <tr
                      key={i}
                      className="text-center hover:bg-gray-50 transition cursor-pointer"
                    >
                      <td
                        className="p-2 border text-blue-600 underline hover:text-blue-800"
                        onClick={() => handleOrderClick(item.order_id)} // Open the order details modal
                      >
                        {item.order_id}
                      </td>
                      <td className="p-2 border">{item.order_status}</td>
                      <td className="p-2 border">
                        {item.order_created_at?.split("T")[0]}
                      </td>
                      <td className="p-2 border">
                        {item.assigned_at?.split("T")[0]}
                      </td>
                      <td className="p-2 border">
                        {item.picked_up_at?.split("T")[0] || "-"}
                      </td>
                      <td className="p-2 border">
                        {item.delivered_at?.split("T")[0] || "-"}
                      </td>
                      <td className="p-2 border font-medium text-green-600">
                        ₹{item.total_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Show OrderDetailsModal if an order is selected */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)} // Close the modal by clearing selectedOrder
        />
      )}
    </>
  );
};

export default RunnerHistoryModal;

// import React, { useEffect, useState } from "react";
// import { API_URL } from "../config";
// import OrderDetailsModal from "./OrderDetailsModal";

// const formatDateTime = (datetimeStr) => {
//   if (!datetimeStr) return "-";
//   const dateObj = new Date(datetimeStr);
//   const date = dateObj.toLocaleDateString("en-GB"); // DD/MM/YYYY
//   const time = dateObj.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return { date, time };
// };

// const RunnerHistoryModal = ({ runner, onClose }) => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const token = sessionStorage.getItem("access_token");
//         const res = await fetch(`${API_URL}/runner/${runner.id}/history`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch history");
//         const data = await res.json();
//         setHistory(data);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [runner.id]);

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-6 overflow-hidden">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-teal-700">
//               Delivery History of {runner.name}
//             </h2>
//             <button
//               className="text-gray-500 hover:text-red-600 text-2xl"
//               onClick={onClose}
//             >
//               &times;
//             </button>
//           </div>

//           {loading ? (
//             <div className="text-center text-gray-500 py-10">
//               Loading history...
//             </div>
//           ) : history.length === 0 ? (
//             <div className="text-center text-gray-400 py-10">
//               No delivery history found.
//             </div>
//           ) : (
//             <div className="overflow-auto max-h-[65vh]">
//               <table className="min-w-full text-sm border rounded-xl overflow-hidden shadow">
//                 <thead className="bg-teal-100 text-teal-800 font-semibold">
//                   <tr className="whitespace-nowrap">
//                     <th className="p-3 border">Order ID</th>
//                     <th className="p-3 border">Status</th>
//                     <th className="p-3 border">Created</th>
//                     <th className="p-3 border">Assigned</th>
//                     <th className="p-3 border">Picked</th>
//                     <th className="p-3 border">Delivered</th>
//                     <th className="p-3 border">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {history.map((item, i) => {
//                     const created = formatDateTime(item.order_created_at);
//                     const assigned = formatDateTime(item.assigned_at);
//                     const picked = formatDateTime(item.picked_up_at);
//                     const delivered = formatDateTime(item.delivered_at);

//                     return (
//                       <tr
//                         key={i}
//                         className="text-center hover:bg-gray-50 transition"
//                       >
//                         <td
//                           className="p-2 border text-blue-600 underline hover:text-blue-800 cursor-pointer"
//                           onClick={() => setSelectedOrderId(item.order_id)}
//                         >
//                           {item.order_id}
//                         </td>
//                         <td className="p-2 border">{item.order_status}</td>

//                         {/* Created */}
//                         <td className="p-2 border">
//                           <div>{created.date}</div>
//                           <div className="text-xs text-gray-500">
//                             {created.time}
//                           </div>
//                         </td>

//                         {/* Assigned */}
//                         <td className="p-2 border">
//                           <div>{assigned.date}</div>
//                           <div className="text-xs text-gray-500">
//                             {assigned.time}
//                           </div>
//                         </td>

//                         {/* Picked */}
//                         <td className="p-2 border">
//                           <div>{picked.date}</div>
//                           <div className="text-xs text-gray-500">
//                             {picked.time}
//                           </div>
//                         </td>

//                         {/* Delivered */}
//                         <td className="p-2 border">
//                           <div>{delivered.date}</div>
//                           <div className="text-xs text-gray-500">
//                             {delivered.time}
//                           </div>
//                         </td>

//                         {/* Price */}
//                         <td className="p-2 border font-medium text-green-600">
//                           ₹{item.total_price}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Details Modal */}
//       {selectedOrderId && (
//         <OrderDetailsModal
//           orderId={selectedOrderId}
//           onClose={() => setSelectedOrderId(null)}
//         />
//       )}
//     </>
//   );
// };

// export default RunnerHistoryModal;

// import React, { useEffect, useState } from "react";
// import { API_URL } from "../config";
// import OrderDetailsModal from "./OrderDetailsModal"; // Import the order details modal

// const RunnerHistoryModal = ({ runner, onClose }) => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrderId, setSelectedOrderId] = useState(null); // For showing order details

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const token = sessionStorage.getItem("access_token");
//         const res = await fetch(`${API_URL}/runner/${runner.id}/history`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch history");
//         const data = await res.json();
//         setHistory(data);
//       } catch (error) {
//         console.error("Error fetching history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [runner.id]);

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 overflow-hidden">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-teal-700">
//               Delivery History of {runner.name}
//             </h2>
//             <button
//               className="text-gray-500 hover:text-red-600 text-2xl"
//               onClick={onClose}
//             >
//               &times;
//             </button>
//           </div>

//           {loading ? (
//             <div className="text-center text-gray-500 py-10">
//               Loading history...
//             </div>
//           ) : history.length === 0 ? (
//             <div className="text-center text-gray-400 py-10">
//               No delivery history found.
//             </div>
//           ) : (
//             <div className="overflow-x-auto max-h-[65vh]">
//               <table className="min-w-full text-sm border rounded-xl overflow-hidden shadow">
//                 <thead className="bg-teal-100 text-teal-800 font-semibold">
//                   <tr>
//                     <th className="p-3 border">Order ID</th>
//                     <th className="p-3 border">Status</th>
//                     <th className="p-3 border">Created</th>
//                     <th className="p-3 border">Assigned</th>
//                     <th className="p-3 border">Picked</th>
//                     <th className="p-3 border">Delivered</th>
//                     <th className="p-3 border">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {history.map((item, i) => (
//                     <tr
//                       key={i}
//                       className="text-center hover:bg-gray-50 transition cursor-pointer"
//                     >
//                       <td
//                         className="p-2 border text-blue-600 underline hover:text-blue-800"
//                         onClick={() => setSelectedOrderId(item.order_id)}
//                       >
//                         {item.order_id}
//                       </td>
//                       <td className="p-2 border">{item.order_status}</td>
//                       <td className="p-2 border">
//                         {item.order_created_at?.split("T")[0]}
//                       </td>
//                       <td className="p-2 border">
//                         {item.assigned_at?.split("T")[0]}
//                       </td>
//                       <td className="p-2 border">
//                         {item.picked_up_at?.split("T")[0] || "-"}
//                       </td>
//                       <td className="p-2 border">
//                         {item.delivered_at?.split("T")[0] || "-"}
//                       </td>
//                       <td className="p-2 border font-medium text-green-600">
//                         ₹{item.total_price}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {selectedOrderId && (
//         <div className="z-[60] fixed inset-0 flex items-center justify-center">
//           <OrderDetailsModal
//             orderId={selectedOrderId}
//             onClose={() => setSelectedOrderId(null)}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default RunnerHistoryModal;
