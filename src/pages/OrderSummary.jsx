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
import { API_URL } from "../config";
import OrderDetailsModal from "../components/OrderDetailsModal";

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
          phone: order.user.phone || "N/A",
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
        `${API_URL}/orders/assign_delivery_boy/${assigningOrderId}`,
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
          <Card
            key={order.id}
            className="shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                <p>
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
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
                      user: {
                        ...order.user,
                        name: details.user_details?.name || order.user.name,
                        email: details.user_details?.email || order.user.email,
                        phone: details.user_details?.phone || order.user.phone,
                      },
                    };
                    // const selected = {
                    //   ...order,
                    //   address: details.shipping_address,
                    //   products: details.items.map((item) => ({
                    //     name: item.product_name,
                    //     quantity: item.quantity,
                    //     price: item.unit_price,
                    //   })),
                    // };
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
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {assigningOrderId && (
        <DeliveryBoyModal
          orderId={assigningOrderId}
          onClose={() => setAssigningOrderId(null)}
          onAssigned={fetchOrders}
        />
      )}
    </div>
  );
};

export default OrderSummary;
