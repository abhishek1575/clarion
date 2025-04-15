import { Home, Package, Users, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarButton = ({ icon: Icon, label, path, isActive }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-4 py-2 text-lg font-medium rounded-lg transition-all duration-300 w-full
        ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
        }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
};

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-white shadow-lg p-4 flex flex-col h-full">
      <div className="flex flex-col gap-4 flex-grow">
        <SidebarButton
          icon={Home}
          label="Dashboard"
          path="/admin/home"
          isActive={pathname === "/admin/home"}
        />
        <SidebarButton
          icon={Package}
          label="Product"
          path="/admin/products"
          isActive={pathname === "/admin/products"}
        />
        <SidebarButton
          icon={Users}
          label="Customer"
          path="/admin/customers"
          isActive={pathname === "/admin/customers"}
        />
        <SidebarButton
          icon={FileText}
          label="Order Summary"
          path="/admin/orders"
          isActive={pathname === "/admin/orders"}
        />
      </div>

      <div className="text-sm text-gray-500 border-t pt-4 mt-auto">
        <p className="font-medium">Contact</p>
        <p className="break-all">contact@gmail.com</p>
      </div>
    </aside>
  );
}

// import { Home, Package, Users, FileText } from "lucide-react";

// const SidebarButton = ({ icon: Icon, label, section, onSelect, isActive }) => (
//   <button
//     onClick={() => onSelect(section)}
//     className={`flex items-center gap-3 px-4 py-2 text-lg font-medium rounded-lg transition-all duration-300 w-full
//       ${
//         isActive
//           ? "bg-blue-600 text-white shadow"
//           : "text-gray-700 hover:bg-blue-100 hover:text-blue-600"
//       }`}
//   >
//     <Icon className="w-5 h-5" />
//     {label}
//   </button>
// );

// export default function Sidebar({ onSelectSection, activeSection }) {
//   return (
//     <aside className="w-64 bg-white shadow-lg p-4 flex flex-col gap-4">
//       <SidebarButton
//         icon={Home}
//         label="Dashboard"
//         section="home"
//         onSelect={onSelectSection}
//         isActive={activeSection === "home"}
//       />
//       <SidebarButton
//         ico
// n={Package}
//         label="Product"
//         section="product"
//         onSelect={onSelectSection}
//         isActive={activeSection === "product"}
//       />
//       <SidebarButton
//         icon={Users}
//         label="Customer"
//         section="customers"
//         onSelect={onSelectSection}
//         isActive={activeSection === "customers"}
//       />
//       <SidebarButton
//         icon={FileText}
//         label="Order Summary"
//         section="orders"
//         onSelect={onSelectSection}
//         isActive={activeSection === "orders"}
//       />
//     </aside>
//   );
// }
