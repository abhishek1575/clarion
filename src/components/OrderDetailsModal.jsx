// components/modals/OrderDetailsModal.jsx
import React from "react";
import { Button } from "./ui/Button";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  console.log("Order Details Modal", order);
  const address = order.address || {};
  const deliveryBoy = order.delivery_boy || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Order #{order.id} Details
        </h2>

        {/* User Info and Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-1">
              User Info
            </h3>
            <p>
              <strong>Name:</strong> {order.user?.name}
            </p>
             <p>
              <strong>Email:</strong> {order.user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {order.user?.phone}
            </p> 
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-1">
              Delivery Address
            </h3>
            <p>
              {address.street}, {address.city}, {address.state},{" "}
              {address.zip_code}, {address.country}
            </p>
          </div>
        </div>

        {/* Product Table */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Products Ordered
          </h3>
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2">Product</th>
                <th className="text-center p-2">Qty</th>
                <th className="text-right p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products?.map((product, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{product.name}</td>
                  <td className="text-center p-2">{product.quantity}</td>
                  <td className="text-right p-2">₹{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delivery Boy */}
        {deliveryBoy.name && (
          <div className="bg-green-100 border border-green-300 p-4 rounded-md mb-4">
            <h3 className="text-md font-medium text-green-800">
              Assigned Delivery Boy
            </h3>
            <p>
              {deliveryBoy.name} ({deliveryBoy.phone})
            </p>
          </div>
        )}

        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-2 right-4 bg-red-500 text-white hover:bg-red-600"
        >
          ✕
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;

// // components/modals/OrderDetailsModal.jsx
// import React from "react";
// import { Button } from "./ui/Button";

// export const OrderDetailsModal = ({ order, onClose }) => {
//   if (!order) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative animate-fadeIn">
//         <h2 className="text-2xl font-bold mb-4 text-gray-800">
//           Order #{order.id} Details
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
//           <div>
//             <h3 className="text-lg font-semibold text-blue-700 mb-1">
//               User Info
//             </h3>
//             <p>
//               <strong>Name:</strong> {order.user.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {order.user.email}
//             </p>
//             <p>
//               <strong>Phone:</strong> {order.user.phone}
//             </p>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-blue-700 mb-1">
//               Delivery Address
//             </h3>
//             <p>
//               {order.address.street}, {order.address.city},{" "}
//               {order.address.state}, {order.address.zip_code}
//             </p>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-blue-700 mb-2">
//             Products Ordered
//           </h3>
//           <table className="w-full text-sm border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="text-left p-2">Product</th>
//                 <th className="text-center p-2">Qty</th>
//                 <th className="text-right p-2">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {order.products.map((product, idx) => (
//                 <tr key={idx} className="border-t">
//                   <td className="p-2">{product.name}</td>
//                   <td className="text-center p-2">{product.quantity}</td>
//                   <td className="text-right p-2">₹{product.price}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {order.delivery_boy && (
//           <div className="bg-green-100 border border-green-300 p-4 rounded-md mb-4">
//             <h3 className="text-md font-medium text-green-800">
//               Assigned Delivery Boy
//             </h3>
//             <p>
//               {order.delivery_boy.name} ({order.delivery_boy.phone})
//             </p>
//           </div>
//         )}

//         <Button
//           onClick={onClose}
//           className="absolute top-2 right-4 bg-red-500 text-white hover:bg-red-600"
//         >
//           ✕
//         </Button>
//       </div>
//     </div>
//   );
// };
// export default OrderDetailsModal;
