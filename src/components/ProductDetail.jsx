import { useState } from "react";
import { updateProduct, deleteProduct } from "../services/productServices"; // Import delete function
import { X } from "lucide-react";

export default function ProductDetail({ product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description || "",
    price: product.price,
    unit: product.unit,
    category: product.category,
    image_url: product.image_url || "",
    stock: product.stock, // ✅ Added stock field
  });

  // Compute availability status dynamically
  const isAvailable = formData.stock > 0 ? "Available" : "Out of Stock";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" ? parseInt(value, 10) || 0 : value, // Convert stock to number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("access_token");

    try {
      await updateProduct(product.id, formData, token);

      // ✅ Update the product list without refreshing
      onUpdate(formData); // Pass updated product details

      onClose(); // Close the modal after update
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update product.");
    }
  };

  const handleDelete = async () => {
    const token = sessionStorage.getItem("access_token");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        await deleteProduct(product.id, token);

        // ✅ Remove the product from UI without refresh
        onUpdate(null); // Notify parent to remove product

        alert("Product deleted successfully!");
        onClose(); // Close modal after deletion
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Unit</label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Jxuice">Juice</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </div>

          {/* Buttons: Side by Side */}
          <div className="col-span-2 flex gap-4 justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

