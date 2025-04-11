import React, { useEffect, useState } from "react";
import { fetchAllUsers, updateUserStatus } from "../services/userService";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const userData = await fetchAllUsers(token);
      setUsers(userData);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      const token = sessionStorage.getItem("access_token");
      await updateUserStatus(userId, !currentStatus, token); // Flip status
      loadUsers(); // Refresh list
    } catch (error) {
      console.error("Failed to update status:", error.message);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white p-4">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.phone}</td>
              <td className="py-2 px-4 capitalize">{user.role}</td>
              <td className="py-2 px-4">
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
  );
}

// import React, { useEffect, useState } from "react";

// export default function UserManagement() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const token = sessionStorage.getItem("access_token");

//       try {
//         const response = await fetch("http://127.0.0.1:5000/admin/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }

//         const data = await response.json();
//         setUsers(data.users);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="overflow-x-auto rounded-lg shadow bg-white p-4">
//       <h2 className="text-2xl font-semibold mb-4">User Management</h2>
//       <table className="min-w-full table-auto border-collapse">
//         <thead>
//           <tr className="bg-gray-200 text-gray-700 text-left">
//             <th className="py-2 px-4">Name</th>
//             <th className="py-2 px-4">Email</th>
//             <th className="py-2 px-4">Phone</th>
//             <th className="py-2 px-4">Role</th>
//             <th className="py-2 px-4">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length > 0 ? (
//             users.map((user) => (
//               <tr key={user.id} className="border-t hover:bg-gray-50">
//                 <td className="py-2 px-4">{user.name}</td>
//                 <td className="py-2 px-4">{user.email}</td>
//                 <td className="py-2 px-4">{user.phone}</td>
//                 <td className="py-2 px-4 capitalize">{user.role}</td>
//                 <td className="py-2 px-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       user.isActive
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {user.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="py-2 px-4" colSpan="5">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
