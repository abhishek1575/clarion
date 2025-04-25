import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/user";
import AdminDashboard from "./pages/AdminDashboard";
import ProductTable from "./components/ProductTable";
import UserManagment from "./components/UserManagment";
import AdminOrderDeliveryDashboard from "./pages/OrderDashboard";

function AppContent() {
  const location = useLocation();
  const authPaths = ["/", "/login", "/register"];
  const isAuthPage = authPaths.includes(location.pathname);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="products" element={<ProductTable />} />
            <Route path="customers" element={<UserManagment />} />
            <Route
              path="orders" element={<AdminOrderDeliveryDashboard/>}
              // element={<h1 className="text-2xl font-bold">Order Summary</h1>}
            />
          </Route>

          {/* Other user-facing routes (optional) */}
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

