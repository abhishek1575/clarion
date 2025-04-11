import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar2';
import AuthNavbar from './components/AuthNavbar'; 
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductDetail from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/user';
import AdminDashboard from './pages/AdminDashboard';
import ProductTable from './components/ProductTable';
import UserManagment from './components/UserManagment';

function AppContent() {
  const location = useLocation();
  const authPaths = ['/','/login', '/register'];
  const isAuthPage = authPaths.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {/* {isAuthPage ? <AuthNavbar /> : <Navbar />} */}
      <main className="container mx-auto px-4 py-8">
        {/* <Router> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/product_table"  element={<ProductTable />} />
            <Route path="/customers" element={<UserManagment />} />
          </Routes>
        {/* </Router> */}
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
