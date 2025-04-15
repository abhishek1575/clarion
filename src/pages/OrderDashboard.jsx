// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/Card";
// import { Button } from "@/components/ui/Button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
// import { toast } from "react-toastify";
// import { dummyOrders, dummyDeliveryBoys } from "../components/dummyData";

// export default function AdminOrderDeliveryDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [deliveryBoys, setDeliveryBoys] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchOrder, setSearchOrder] = useState("");
//   const [searchBoy, setSearchBoy] = useState("");

//   useEffect(() => {
//     fetchOrders();
//     fetchDeliveryBoys();
//   }, []);

//   const fetchOrders = () => {
//     setOrders(dummyOrders); // Assuming dummyOrders are already in first-to-last order
//   };

//   const fetchDeliveryBoys = () => {
//     setDeliveryBoys(dummyDeliveryBoys);
//   };

//   const assignDelivery = (deliveryBoyId) => {
//     const orderToAssign = selectedOrder;

//     if (!orderToAssign || !deliveryBoyId) return;

//     toast.success(
//       `Order #${orderToAssign.id} assigned to delivery boy ID: ${deliveryBoyId}`
//     );

//     setOrders((prev) => prev.filter((order) => order.id !== orderToAssign.id));
//     setDeliveryBoys((prev) => prev.filter((boy) => boy.id !== deliveryBoyId));
//     setSelectedOrder(null); // Close the dialog
//   };

//   return (
//     <div className="p-4">
//       <Card className="bg-white shadow-xl rounded-2xl p-4 max-w-4xl mx-auto">
//         <h2 className="text-xl font-semibold mb-4">🛒 Unassigned Orders</h2>
//         <Input
//           placeholder="Search orders..."
//           value={searchOrder}
//           onChange={(e) => setSearchOrder(e.target.value)}
//           className="mb-4"
//         />
//         <div className="space-y-3 max-h-[70vh] overflow-y-auto">
//           {orders
//             .filter((o) =>
//               o.customerName.toLowerCase().includes(searchOrder.toLowerCase())
//             )
//             .map((order) => (
//               <Card key={order.id} className="p-4 border flex flex-col">
//                 <p>
//                   <strong>Order ID:</strong> #{order.id}
//                 </p>
//                 <p>
//                   <strong>Customer:</strong> {order.customerName}
//                 </p>
//                 <p>
//                   <strong>Amount:</strong> ₹{order.amount}
//                 </p>
//                 <p>
//                   <strong>Items:</strong> {order.items.join(", ")}
//                 </p>
//                 <Dialog>
//                   <DialogTrigger asChild>
//                     <Button
//                       onClick={() => setSelectedOrder(order)}
//                       className="mt-2"
//                     >
//                       Assign
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-md">
//                     <h3 className="font-semibold text-lg mb-4">
//                       Select Delivery Boy
//                     </h3>
//                     <Input
//                       placeholder="Search delivery boys..."
//                       value={searchBoy}
//                       onChange={(e) => setSearchBoy(e.target.value)}
//                       className="mb-2"
//                     />
//                     <div className="space-y-2 max-h-64 overflow-y-auto">
//                       {deliveryBoys
//                         .filter((boy) =>
//                           boy.name
//                             .toLowerCase()
//                             .includes(searchBoy.toLowerCase())
//                         )
//                         .map((boy) => (
//                           <div
//                             key={boy.id}
//                             className="flex justify-between items-center bg-gray-100 p-2 rounded"
//                           >
//                             <div>
//                               <p className="font-medium">{boy.name}</p>
//                               <p className="text-sm text-gray-600">
//                                 📞 {boy.phone}
//                               </p>
//                             </div>
//                             <Button
//                               onClick={() => assignDelivery(boy.id)}
//                               className="bg-green-600 hover:bg-green-700"
//                             >
//                               Assign
//                             </Button>
//                           </div>
//                         ))}
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </Card>
//             ))}
//         </div>
//       </Card>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";
import { toast } from "react-toastify";
import { dummyOrders, dummyDeliveryBoys } from "../components/dummyData";

export default function AdminOrderDeliveryDashboard() {
  const [orders, setOrders] = useState([]);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchOrder, setSearchOrder] = useState("");
  const [searchBoy, setSearchBoy] = useState("");

  useEffect(() => {
    fetchOrders();
    fetchDeliveryBoys();
  }, []);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  const fetchDeliveryBoys = async () => {
    setDeliveryBoys(dummyDeliveryBoys);
  };

  const assignDelivery = async (orderId, deliveryBoyId) => {
    toast.success(
      `Order #${orderId} assigned to delivery boy ID: ${deliveryBoyId}`
    );
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    setDeliveryBoys((prev) => prev.filter((boy) => boy.id !== deliveryBoyId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {/* Orders Panel */}
      <Card className="bg-white shadow-xl rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">🛒 Unassigned Orders</h2>
        <Input
          placeholder="Search orders..."
          value={searchOrder}
          onChange={(e) => setSearchOrder(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {orders
            .filter((o) =>
              o.customerName.toLowerCase().includes(searchOrder.toLowerCase())
            )
            .map((order) => (
              <Card key={order.id} className="p-4 border flex flex-col">
                <p>
                  <strong>Order ID:</strong> #{order.id}
                </p>
                <p>
                  <strong>Customer:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{order.amount}
                </p>
                <p>
                  <strong>Items:</strong> {order.items.join(", ")}
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedOrder(order)}
                      className="mt-2"
                    >
                      Assign
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <h3 className="font-semibold text-lg mb-4">
                      Select Delivery Boy
                    </h3>
                    <Input
                      placeholder="Search delivery boys..."
                      value={searchBoy}
                      onChange={(e) => setSearchBoy(e.target.value)}
                      className="mb-2"
                    />
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {deliveryBoys
                        .filter((boy) =>
                          boy.name
                            .toLowerCase()
                            .includes(searchBoy.toLowerCase())
                        )
                        .map((boy) => (
                          <div
                            key={boy.id}
                            className="flex justify-between items-center bg-gray-100 p-2 rounded"
                          >
                            <div>
                              <p className="font-medium">{boy.name}</p>
                              <p className="text-sm text-gray-600">
                                📞 {boy.phone}
                              </p>
                            </div>
                            <Button
                              onClick={() => assignDelivery(order.id, boy.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Assign
                            </Button>
                          </div>
                        ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </Card>
            ))}
        </div>
      </Card>

      {/* Delivery Boy Panel */}
      <Card className="bg-white shadow-xl rounded-2xl p-4">
        <h2 className="text-xl font-semibold mb-4">🚴 Free Delivery Boys</h2>
        <Input
          placeholder="Search delivery boys..."
          value={searchBoy}
          onChange={(e) => setSearchBoy(e.target.value)}
          className="mb-4"
        />
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {deliveryBoys
            .filter((boy) =>
              boy.name.toLowerCase().includes(searchBoy.toLowerCase())
            )
            .map((boy) => (
              <Card key={boy.id} className="p-4 border">
                <p>
                  <strong>Name:</strong> {boy.name}
                </p>
                <p>
                  <strong>Phone:</strong> {boy.phone}
                </p>
                <p className="text-green-600 font-medium">Status: FREE</p>
              </Card>
            ))}
        </div>
      </Card>
    </div>
  );
}
