// src/components/UserManagement.jsx
import React, { useEffect, useState } from "react";
import { fetchAllUsers, updateUserStatus } from "../services/userService";
import { SlidersHorizontal, Plus } from "lucide-react";
import AddRunnerModal from "./AddRunnerModal";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [showAddRunner, setShowAddRunner] = useState(false);

  const loadUsers = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const userData = await fetchAllUsers(token);
      setUsers(userData);
      setFilteredUsers(userData);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (filterRole === "All") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          (user) => user.role.toLowerCase() === filterRole.toLowerCase()
        )
      );
    }
  }, [filterRole, users]);

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const token = sessionStorage.getItem("access_token");
      await updateUserStatus(userId, !currentStatus, token);
      loadUsers();
    } catch (error) {
      console.error("Failed to update status:", error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-700">User Management</h2>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="text-gray-500" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Roles</option>
            <option value="user">User</option>
            <option value="runner">Runner</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={() => setShowAddRunner(true)}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={16} /> Add Runner
          </button>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Name
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Phone
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Role
                </th>
                <th className="px-4 py-2 font-semibold text-sm text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2 capitalize">{user.role}</td>
                  <td className="px-4 py-2">
                    <button
                      onDoubleClick={() =>
                        handleStatusToggle(user.id, user.isActive)
                      }
                      title="Double-click to change status"
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow transition-all duration-200 ${
                        user.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No users found for the selected role.
        </p>
      )}

      {showAddRunner && (
        <AddRunnerModal
          onClose={() => setShowAddRunner(false)}
          onSuccess={loadUsers}
        />
      )}
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { fetchAllUsers, updateUserStatus } from "../services/userService";
// import { SlidersHorizontal } from "lucide-react";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [filterRole, setFilterRole] = useState("All");

//   const loadUsers = async () => {
//     try {
//       const token = sessionStorage.getItem("access_token");
//       const userData = await fetchAllUsers(token);
//       setUsers(userData);
//       setFilteredUsers(userData);
//     } catch (error) {
//       console.error("Error loading users:", error);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   useEffect(() => {
//     if (filterRole === "All") {
//       setFilteredUsers(users);
//     } else {
//       setFilteredUsers(
//         users.filter(
//           (user) => user.role.toLowerCase() === filterRole.toLowerCase()
//         )
//       );
//     }
//   }, [filterRole, users]);

//   const handleStatusToggle = async (userId, currentStatus) => {
//     try {
//       const token = sessionStorage.getItem("access_token");
//       await updateUserStatus(userId, !currentStatus, token);
//       loadUsers();
//     } catch (error) {
//       console.error("Failed to update status:", error.message);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 rounded-lg shadow-md">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-3xl font-bold text-gray-700">User Management</h2>
//         <div className="flex items-center gap-2">
//           <SlidersHorizontal className="text-gray-500" />
//           <select
//             value={filterRole}
//             onChange={(e) => setFilterRole(e.target.value)}
//             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="All">All Roles</option>
//             <option value="user">User</option>
//             <option value="runner">Runner</option>
//             <option value="admin">Admin</option> {/* 👈 Added this line */}
//           </select>
//         </div>
//       </div>

//       {filteredUsers.length > 0 ? (
//         <div className="overflow-x-auto bg-white rounded-lg shadow">
//           <table className="min-w-full table-auto text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-2 font-semibold text-sm text-gray-600">
//                   Name
//                 </th>
//                 <th className="px-4 py-2 font-semibold text-sm text-gray-600">
//                   Email
//                 </th>
//                 <th className="px-4 py-2 font-semibold text-sm text-gray-600">
//                   Phone
//                 </th>
//                 <th className="px-4 py-2 font-semibold text-sm text-gray-600">
//                   Role
//                 </th>
//                 <th className="px-4 py-2 font-semibold text-sm text-gray-600">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="border-t hover:bg-gray-50 transition"
//                 >
//                   <td className="px-4 py-2">{user.name}</td>
//                   <td className="px-4 py-2">{user.email}</td>
//                   <td className="px-4 py-2">{user.phone}</td>
//                   <td className="px-4 py-2 capitalize">{user.role}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       onDoubleClick={() =>
//                         handleStatusToggle(user.id, user.isActive)
//                       }
//                       title="Double-click to change status"
//                       className={`px-3 py-1 rounded-full text-sm font-medium shadow transition-all duration-200 ${
//                         user.isActive
//                           ? "bg-green-100 text-green-800 hover:bg-green-200"
//                           : "bg-red-100 text-red-800 hover:bg-red-200"
//                       }`}
//                     >
//                       {user.isActive ? "Active" : "Inactive"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-10">
//           No users found for the selected role.
//         </p>
//       )}
//     </div>
//   );
// }
