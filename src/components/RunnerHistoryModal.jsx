import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

const RunnerHistoryModal = ({ runner, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleOrderClick = async (orderId) => {
    try {
      const token = sessionStorage.getItem("access_token");
      const res = await fetch(`${API_URL}/orders/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch order details");
      const data = await res.json();
      setSelectedOrder(data);
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
                        onClick={() => handleOrderClick(item.order_id)}
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

      {/* Custom Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white max-w-4xl w-full p-6 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-xl text-gray-600 hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-teal-700">
              Order #{selectedOrder.order_id} Details
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column: Order Items */}
              <div className="md:w-2/3">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  Items
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border border-gray-300 rounded-lg">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-2 border">Product</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Unit Price</th>
                        <th className="px-4 py-2 border">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td className="px-4 py-2 border">
                            {item.product_name}
                          </td>
                          <td className="px-4 py-2 border">{item.quantity}</td>
                          <td className="px-4 py-2 border">
                            ₹{item.unit_price}
                          </td>
                          <td className="px-4 py-2 border">
                            ₹{item.unit_price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Order Summary & Shipping Address */}
              <div className="md:w-1/3 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Order Summary
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      <strong>Status:</strong> {selectedOrder.status}
                    </li>
                    <li>
                      <strong>User ID:</strong> {selectedOrder.user_id}
                    </li>
                    <li>
                      <strong>Created At:</strong>{" "}
                      {selectedOrder.created_at?.split("T")[0]}
                    </li>
                    <li>
                      <strong>Total Price:</strong> ₹{selectedOrder.total_price}
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">
                    Shipping Address
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>{selectedOrder.shipping_address.street}</li>
                    <li>
                      {selectedOrder.shipping_address.city},{" "}
                      {selectedOrder.shipping_address.state}
                    </li>
                    <li>
                      {selectedOrder.shipping_address.zip_code},{" "}
                      {selectedOrder.shipping_address.country}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RunnerHistoryModal;

// import React, { useEffect, useState } from "react";
// import { API_URL } from "../config";
// import OrderDetailsModal from "./OrderDetailsModal"; // Import the OrderDetailsModal

// const RunnerHistoryModal = ({ runner, onClose }) => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState(null); // Store the selected order details

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

//   // Handle opening the OrderDetailsModal
//   const handleOrderClick = async (orderId) => {
//     try {
//       const token = sessionStorage.getItem("access_token");
//       const res = await fetch(`${API_URL}/orders/${orderId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) throw new Error("Failed to fetch order details");
//       const data = await res.json();
//       setSelectedOrder(data); // Set selected order details
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//     }
//   };

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
//                         onClick={() => handleOrderClick(item.order_id)} // Open the order details modal
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

//       {/* Show OrderDetailsModal if an order is selected */}
//       {selectedOrder && (
//         <OrderDetailsModal
//           order={selectedOrder}
//           onClose={() => setSelectedOrder(null)} // Close the modal by clearing selectedOrder
//         />
//       )}
//     </>
//   );
// };

// export default RunnerHistoryModal;
