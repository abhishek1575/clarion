import { Home, Package, Users, FileText } from "lucide-react";

const SidebarButton = ({ icon: Icon, label, section, onSelect, isActive }) => (
  <button
    onClick={() => onSelect(section)}
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
export default function Sidebar({ onSelectSection, activeSection }) {
  return (
    <aside className="w-64 bg-white shadow-lg p-4 flex flex-col justify-between h-full">
      {/* Top Section: Sidebar Buttons */}
      <div className="flex flex-col gap-4">
        <SidebarButton
          icon={Home}
          label="Dashboard"
          section="home"
          onSelect={onSelectSection}
          isActive={activeSection === "home"}
        />
        <SidebarButton
          icon={Package}
          label="Product"
          section="product"
          onSelect={onSelectSection}
          isActive={activeSection === "product"}
        />
        <SidebarButton
          icon={Users}
          label="Customer"
          section="customers"
          onSelect={onSelectSection}
          isActive={activeSection === "customers"}
        />
        <SidebarButton
          icon={FileText}
          label="Order Summary"
          section="orders"
          onSelect={onSelectSection}
          isActive={activeSection === "orders"}
        />
      </div>

      {/* Bottom Section: Contact Info */}
      <div className="text-sm text-gray-500 border-t pt-4 mt-4">
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
