// data/sampleorder.js

export const sampleOrders = [
  {
    id: 1001,
    status: "Pending",
    total_price: 399,
    created_at: "2025-04-20T10:45:00Z",
    user: {
      name: "Ravi Sharma",
      email: "ravi@example.com",
      phone: "9876543210",
    },
    address: {
      street: "15th Main Rd",
      city: "Bangalore",
      state: "Karnataka",
      zip_code: "560078",
    },
    products: [
      { name: "Apple", quantity: 2, price: 50 },
      { name: "Milk", quantity: 1, price: 40 },
    ],
    delivery_boy: null,
  },
  {
    id: 1002,
    status: "Shipped",
    total_price: 1200,
    created_at: "2025-04-18T14:00:00Z",
    user: {
      name: "Priya Verma",
      email: "priya@example.com",
      phone: "9812345678",
    },
    address: {
      street: "MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      zip_code: "400001",
    },
    products: [
      { name: "Bread", quantity: 3, price: 60 },
      { name: "Butter", quantity: 1, price: 90 },
    ],
    delivery_boy: {
      name: "Amit",
      phone: "9123456780",
    },
  },
  {
    id: 1003,
    status: "Delivered",
    total_price: 875,
    created_at: "2025-04-15T08:30:00Z",
    user: {
      name: "Ankit Singh",
      email: "ankit@example.com",
      phone: "9988776655",
    },
    address: {
      street: "Sector 22",
      city: "Noida",
      state: "Uttar Pradesh",
      zip_code: "201301",
    },
    products: [
      { name: "Banana", quantity: 6, price: 10 },
      { name: "Yogurt", quantity: 2, price: 35 },
    ],
    delivery_boy: {
      name: "Rakesh",
      phone: "9001122334",
    },
  },
];
