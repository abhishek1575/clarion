// RunnerTable.jsx
import React, { useEffect, useState } from "react";
import {API_URL} from "../config";
import RunnerHistoryModal from "../components/RunnerHistoryModal";

const RunnerTable = () => {
  const [runners, setRunners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRunner, setSelectedRunner] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRunners();
  }, []);

  const fetchRunners = async () => {
    try {
      const token = sessionStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/runner/all_runners`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch runners");
      }

      const data = await response.json();
      setRunners(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching runners:", error);
      setLoading(false);
    }
  };

  const handleHistoryClick = (runner) => {
    setSelectedRunner(runner);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-500">
        Runner Details
      </h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading runners...</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-teal-500 text-white text-md uppercase tracking-wider">
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">History</th>
              </tr>
            </thead>
            <tbody>
              {runners.map((runner, index) => (
                <tr
                  key={runner.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6 font-semibold">{runner.name}</td>
                  <td className="py-4 px-6">{runner.email}</td>
                  <td className="py-4 px-6">{runner.phone}</td>
                  <td className="py-4 px-6">
                    {runner.isActive ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                        Active
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
                      onClick={() => handleHistoryClick(runner)}
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <RunnerHistoryModal
          runner={selectedRunner}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RunnerTable;

// import React, { useEffect, useState } from "react";
// import  API_URL  from "../config";

// const RunnerTable = () => {
//   const [runners, setRunners] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchRunners();
//   }, []);

//   const fetchRunners = async () => {
//     try {
//       const token = sessionStorage.getItem("access_token");
//       const response = await fetch(`${API_URL}/runner/all_runners`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch runners");
//       }

//       const data = await response.json();
//       setRunners(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching runners:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center text-teal-500">
//         Runner Details
//       </h1>

//       {loading ? (
//         <div className="text-center text-gray-500">Loading runners...</div>
//       ) : (
//         <div className="overflow-x-auto rounded-xl shadow-lg">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr className="bg-teal-500 text-white text-md uppercase tracking-wider">
//                 <th className="py-3 px-6 text-left">#</th>
//                 <th className="py-3 px-6 text-left">Name</th>
//                 <th className="py-3 px-6 text-left">Email</th>
//                 <th className="py-3 px-6 text-left">Phone</th>
//                 <th className="py-3 px-6 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {runners.map((runner, index) => (
//                 <tr
//                   key={runner.id}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="py-4 px-6">{index + 1}</td>
//                   <td className="py-4 px-6 font-semibold">{runner.name}</td>
//                   <td className="py-4 px-6">{runner.email}</td>
//                   <td className="py-4 px-6">{runner.phone}</td>
//                   <td className="py-4 px-6">
//                     {runner.isActive ? (
//                       <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
//                         Active
//                       </span>
//                     ) : (
//                       <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600">
//                         Inactive
//                       </span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RunnerTable;
