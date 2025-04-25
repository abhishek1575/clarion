// --- OrderSummary.jsx ---
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Input,
  Select,
  SelectItem,
} from "../components/ui/index";
import { getAllOrders, getOrderDetailsById } from "../services/orderService";
import { DeliveryBoyModal } from "./DeliveryBoyModal";

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assigningOrderId, setAssigningOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, searchTerm, orders]);

  const fetchOrders = async () => {
    try {
      const rawOrders = await getAllOrders();
      const formattedOrders = rawOrders.map((order) => ({
        id: order.order_id,
        user: {
          id: order.user_id,
          name: order.user,
          email: "N/A",
          phone: "N/A",
        },
        status: order.status,
        total_price: order.total_price,
        created_at: order.created_at,
        address: {
          street: "N/A",
          city: "N/A",
          state: "N/A",
          zip_code: "N/A",
        },
        products: [],
        delivery_boy: order.delivery_boy || null,
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const filterOrders = () => {
    const term = searchTerm.toLowerCase();
    const filtered = orders.filter((order) => {
      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchesSearch =
        order.user.name.toLowerCase().includes(term) ||
        order.id.toString().includes(term);
      return matchesStatus && matchesSearch;
    });
    setFilteredOrders(filtered);
  };

  const handleStatusChange = (status) => {
    setStatusFilter(status);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAssignClick = (orderId) => {
    setAssigningOrderId(orderId);
  };

  const handleAssignToDeliveryBoy = async (deliveryBoyId) => {
    const token = sessionStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/orders/assign_delivery_boy/${assigningOrderId}`,
        { delivery_boy_id: deliveryBoyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAssigningOrderId(null);
      fetchOrders();
    } catch (error) {
      console.error("Error assigning delivery boy:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Input
          placeholder="Search by user name or order ID"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full sm:w-1/3"
        />
        <Select onValueChange={handleStatusChange} value={statusFilter}>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Shipped">Shipped</SelectItem>
          <SelectItem value="Delivered">Delivered</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer">
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p>
                  Status: <span className={`font-bold ${order.status === "Pending" ? "text-yellow-600" : order.status === "Shipped" ? "text-blue-600" : "text-green-600"}`}>{order.status}</span>
                </p>
                <p>Total: ₹{order.total_price}</p>
                <p>Placed: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              {order.status === "Pending" && !order.delivery_boy && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAssignClick(order.id);
                  }}
                  className="w-full"
                >
                  Assign Delivery Boy
                </Button>
              )}
              <Button
                onClick={async () => {
                  try {
                    const details = await getOrderDetailsById(order.id);
                    const selected = {
                      ...order,
                      address: details.shipping_address,
                      products: details.items.map((item) => ({
                        name: item.product_name,
                        quantity: item.quantity,
                        price: item.unit_price,
                      })),
                    };
                    setSelectedOrder(selected);
                  } catch (error) {
                    console.error("Error loading order details:", error);
                  }
                }}
                className="w-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl w-full rounded-xl shadow-xl p-6 space-y-4 relative">
            <h2 className="text-xl font-semibold mb-4">Order #{selectedOrder.id} Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">User Info</h3>
                <p>Name: {selectedOrder.user.name}</p>
                <p>Email: {selectedOrder.user.email}</p>
                <p>Phone: {selectedOrder.user.phone}</p>
              </div>
              <div>
                <h3 className="font-medium">Delivery Address</h3>
                <p>{selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.zip_code}</p>
              </div>
            </div>
            <div>
              <h3 className="font-medium">Products</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products.map((product, index) => (
                    <tr key={index} className="border-t">
                      <td>{product.name}</td>
                      <td className="text-center">{product.quantity}</td>
                      <td className="text-right">₹{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {selectedOrder.delivery_boy && (
              <div className="bg-green-50 p-3 rounded-md">
                <h3 className="font-medium text-green-700">Assigned Delivery Boy</h3>
                <p>{selectedOrder.delivery_boy.name} ({selectedOrder.delivery_boy.phone})</p>
              </div>
            )}
            <Button onClick={() => setSelectedOrder(null)} className="absolute top-2 right-4 bg-red-500 hover:bg-red-600">✕</Button>
          </div>
        </div>
      )}

      {assigningOrderId && (
        <DeliveryBoyModal
          onClose={() => setAssigningOrderId(null)}
          onSelect={handleAssignToDeliveryBoy}
        />
      )}
    </div>
  );
};

export default OrderSummary;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Button,
//   Input,
//   Select,
//   SelectItem,
// } from "../components/ui/index";
// import { getAllOrders, getOrderDetailsById } from "../services/orderService";


// const OrderSummary = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   useEffect(() => {
//     filterOrders();
//   }, [statusFilter, searchTerm, orders]);


//   const fetchOrders = async () => {
//     try {
//       const rawOrders = await getAllOrders();
//       const formattedOrders = rawOrders.map((order) => ({
//         id: order.order_id,
//         user: {
//           id: order.user_id,
//           name: order.user,
//           email: "N/A", // Backend doesn't return email
//           phone: "N/A", // Placeholder
//         },
//         status: order.status,
//         total_price: order.total_price,
//         created_at: order.created_at,
//         address: {
//           street: "N/A",
//           city: "N/A",
//           state: "N/A",
//           zip_code: "N/A",
//         },
//         products: [],
//         delivery_boy: null,
//       }));
//       setOrders(formattedOrders);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };



//   const filterOrders = () => {
//     const term = searchTerm.toLowerCase();
//     const filtered = orders.filter((order) => {
//       const matchesStatus =
//         statusFilter === "All" || order.status === statusFilter;
//       const matchesSearch =
//         order.user.name.toLowerCase().includes(term) ||
//         order.id.toString().includes(term);
//       return matchesStatus && matchesSearch;
//     });
//     setFilteredOrders(filtered);
//   };

//   const handleStatusChange = (status) => {
//     setStatusFilter(status);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const assignDeliveryBoy = async (orderId) => {
//     try {
//       await axios.post(`/api/orders/${orderId}/assign`);
//       fetchOrders();
//     } catch (error) {
//       console.error("Error assigning delivery boy:", error);
//     }
//   };

//   const closeModal = () => setSelectedOrder(null);

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//         <Input
//           placeholder="Search by user name or order ID"
//           value={searchTerm}
//           onChange={handleSearch}
//           className="w-full sm:w-1/3"
//         />
//         <Select onValueChange={handleStatusChange} value={statusFilter}>
//           <SelectItem value="All">All</SelectItem>
//           <SelectItem value="Pending">Pending</SelectItem>
//           <SelectItem value="Shipped">Shipped</SelectItem>
//           <SelectItem value="Delivered">Delivered</SelectItem>
//         </Select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredOrders.map((order) => (
//           <Card
//             key={order.id}
//             className="shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
//           >
//             <CardContent className="space-y-4">
//               <div>
//                 <h2 className="text-xl font-semibold">Order #{order.id}</h2>
//                 <p>
//                   Status:{" "}
//                   <span
//                     className={`font-bold ${
//                       order.status === "Pending"
//                         ? "text-yellow-600"
//                         : order.status === "Shipped"
//                         ? "text-blue-600"
//                         : "text-green-600"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </p>
//                 <p>Total: ₹{order.total_price}</p>
//                 <p>Placed: {new Date(order.created_at).toLocaleDateString()}</p>
//                 {/* <p>Name: {order.user}</p> */}
//               </div>

//               {order.status === "Pending" && !order.delivery_boy && (
//                 <Button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     assignDeliveryBoy(order.id);
//                   }}
//                   className="w-full"
//                 >
//                   Assign Delivery Boy
//                 </Button>
//               )}

//               <Button
//                 //
//                 onClick={async () => {
//                   try {
//                     const details = await getOrderDetailsById(order.id);
//                     const selected = {
//                       ...order,
//                       address: details.shipping_address,
//                       products: details.items.map((item) => ({
//                         name: item.product_name,
//                         quantity: item.quantity,
//                         price: item.unit_price,
//                       })),
//                     };
//                     setSelectedOrder(selected);
//                   } catch (error) {
//                     console.error("Error loading order details:", error);
//                   }
//                 }}
//                 className="w-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
//               >
//                 View Details
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {selectedOrder && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white max-w-2xl w-full rounded-xl shadow-xl p-6 space-y-4 relative">
//             <h2 className="text-xl font-semibold mb-4">
//               Order #{selectedOrder.id} Details
//             </h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="font-medium">User Info</h3>
//                 <p>Name: {selectedOrder.user.name}</p>
//                 <p>Email: {selectedOrder.user.email}</p>
//                 <p>Phone: {selectedOrder.user.phone}</p>
//               </div>
//               <div>
//                 <h3 className="font-medium">Delivery Address</h3>
//                 <p>
//                   {selectedOrder.address.street}, {selectedOrder.address.city},{" "}
//                   {selectedOrder.address.state},{" "}
//                   {selectedOrder.address.zip_code}
//                 </p>
//               </div>
//             </div>
//             <div>
//               <h3 className="font-medium">Products</h3>
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr>
//                     <th className="text-left">Name</th>
//                     <th>Qty</th>
//                     <th>Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedOrder.products.map((product, index) => (
//                     <tr key={index} className="border-t">
//                       <td>{product.name}</td>
//                       <td className="text-center">{product.quantity}</td>
//                       <td className="text-right">₹{product.price}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {selectedOrder.delivery_boy && (
//               <div className="bg-green-50 p-3 rounded-md">
//                 <h3 className="font-medium text-green-700">
//                   Assigned Delivery Boy
//                 </h3>
//                 <p>
//                   {selectedOrder.delivery_boy.name} (
//                   {selectedOrder.delivery_boy.phone})
//                 </p>
//               </div>
//             )}
//             <Button
//               onClick={closeModal}
//               className="absolute top-2 right-4 bg-red-500 hover:bg-red-600"
//             >
//               ✕
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderSummary;

