// AdminDashboard.jsx
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to /admin/home if someone visits /admin directly
    if (location.pathname === "/admin") {
      navigate("/admin/home", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Navbar */}
      <div className="h-16">
        <Navbar />
      </div>

      {/* Sidebar and Dynamic Content Area */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

