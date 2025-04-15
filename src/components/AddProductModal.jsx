// import { useState } from "react";
// import { addProduct } from "../services/productServices";

// export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     unit: "",
//     stock: "",
//     category: "",
//   });
//   const [imageFile, setImageFile] = useState(null); // New state for image file

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]); // Store selected image file
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = sessionStorage.getItem("access_token");

//     const productData = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       productData.append(key, value);
//     });

//     if (imageFile) {
//       productData.append("image_url", imageFile); // Attach file to form data
//     }

//     try {
//       const newProduct = await addProduct(productData, token);
//       onProductAdded(newProduct);
//       onClose();
//     } catch (error) {
//       console.error("Failed to add product");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Add Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Product Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             name="unit"
//             placeholder="Unit (e.g. Kg)"
//             value={formData.unit}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="number"
//             name="stock"
//             placeholder="Stock"
//             value={formData.stock}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />

//           <label className="block text-sm font-medium">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="">Select Category</option>
//             <option value="Vegetable">Vegetable</option>
//             <option value="Fruit">Fruit</option>
//             <option value="Juice">Juice</option>
//           </select>

//           <label className="block text-sm font-medium">Product Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full p-2 border rounded"
//           />

//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// components/AddProductModal.jsx


import { useState } from "react";
import { addProduct } from "../services/productServices";

export default function AddProductModal({ isOpen, onClose, onProductAdded, fetchProducts }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    unit: "",
    stock: "",
    category: "",
    image_url: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("access_token");

    try {
      const newProduct = await addProduct(formData, token);
      onProductAdded(newProduct); // Update product list
      fetchProducts(); // Fetch updated product list
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to add product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit (e.g. Kg)"
            value={formData.unit}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Juice">Juice</option>
          </select>

          <input
            type="text"
            name="image_url"
            placeholder="Image URL (optional)"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
