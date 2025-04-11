import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center w-full flex-shrink-0">
      <span className="text-2xl font-bold text-blue-700">Clarion</span>
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-700 transition-colors duration-300" />
        <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-700 transition-colors duration-300" />
      </div>
    </nav>
  );
}

// import { Bell, User } from "lucide-react";
// export default function Navbar() {
//   return (
//     <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center w-full">
//       <span className="text-2xl font-bold text-blue-700">Clarion</span>
//       <div className="flex items-center gap-4">
//         <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-700 transition-colors duration-300" />
//         <User className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-700 transition-colors duration-300" />
//       </div>
//     </nav>
//   );
// }
