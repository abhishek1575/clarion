import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservices";
import { toast, ToastContainer } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(formData); // Call login API
      const userRole = data?.user?.role || sessionStorage.getItem("role");

      if (userRole !== "admin") {
        toast.error("❌ Access Denied: Only admin users are allowed!");
        sessionStorage.clear(); // Optional: clear session
        return;
      }

      toast.success("✅ Login successful!");
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid login credentials");
      toast.error("❌ " + (err.message || "Login failed"));
    }
  };
  
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const data = await loginUser(formData); // Call login API

  //     // If login is successful and the role is admin, navigate to admin page
  //     navigate("/admin");
  //   } catch (err) {
  //     // Show the error message if login fails or the user is not an admin
  //     setError(err.message || "Invalid login credentials");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to Your Account
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
          >
            LOGIN
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Login;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authservices";

// function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const data = await loginUser(formData); // Call login API
//       localStorage.setItem("token", data.token); // Save token
//       navigate("/admin");
//     } catch (err) {
//       setError(err.message || "Invalid login credentials"); // Handle errors
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="bg-white rounded-lg shadow-md p-8">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           Login to Your Account
//         </h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}{" "}
//         {/* Show errors */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               {/* <input
//                 type="checkbox"
//                 id="remember"
//                 className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//               /> */}
//               {/* <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
//                 Remember me
//               </label> */}
//             </div>
//             <a href="#" className="text-sm text-primary hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
//           >
//             LOGIN
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-primary hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
