import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import HomePage from "./Home";
import ProductTable from "../components/ProductTable";
import UserMangement from "../components/UserManagment";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar & Main Content */}
      <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          onSelectSection={setActiveSection}
          activeSection={activeSection}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === "home" && <HomePage />}
          {activeSection === "product" && <ProductTable />}
          {activeSection === "customers" && <UserMangement />}
          {activeSection === "orders" && (
            <h1 className="text-2xl font-bold">Order Summary</h1>
          )}
        </main>
      </div>
    </div>
  );
}


// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import HomePage from "./Home";
// import ProductTable from "../components/ProductTable";
// import UserMangement from "../components/UserManagment";

// export default function AdminDashboard() {
//   const [activeSection, setActiveSection] = useState("home");

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-gray-300 overflow-hidden">
//       {/* Navbar */}
//       <Navbar />

//       {/* Sidebar & Main Content */}
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           onSelectSection={setActiveSection}
//           activeSection={activeSection}
//         />

//         {/* <Sidebar onSelectSection={setActiveSection} /> */}

//         {/* Scrollable Content Area */}
//         <main className="flex-1 overflow-hidden p-6">
//           {activeSection === "home" && <HomePage />}
//           {activeSection === "product" && <ProductTable />}
//           {activeSection === "customers" && <UserMangement />}
//           {activeSection === "orders" && (
//             <h1 className="text-2xl">Order Summary</h1>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
