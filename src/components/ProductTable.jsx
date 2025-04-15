import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productServices";
import ProductDetail from "./ProductDetail";
import AddProductModal from "./AddProductModal";

export default function ProductTable() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const fetchProducts = async () => {
    const token = sessionStorage.getItem("access_token");
    const data = await getAllProducts(token);
    setProducts(data);
  };

  // Use it in useEffect for initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const token = sessionStorage.getItem("access_token");
  //     const data = await getAllProducts(token);
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, []);

  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: "Out of Stock", color: "text-red-600" };
    if (stock < 10) return { text: "Low Stock", color: "text-orange-500" };
    return { text: "Available", color: "text-green-600" };
  };

  const handleProductUpdate = (updatedProduct) => {
    if (updatedProduct) {
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === updatedProduct.id ? updatedProduct : prod
        )
      );
    } else {
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod.id !== selectedProduct.id)
      );
    }

    setSelectedProduct(null);
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };
   console.log("Product image URL:", products.image_url);

  const filteredProducts = products.filter((product) => {
    const stockStatus = getStockStatus(product.stock).text.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? product.category === selectedCategory : true) &&
      (stockFilter ? stockStatus.includes(stockFilter.toLowerCase()) : true)
    );
  });

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add Product
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border px-3 py-2 rounded shadow-sm w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded shadow-sm w-full md:w-1/3"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(products.map((p) => p.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded shadow-sm w-full md:w-1/3"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="out">Out of Stock</option>
          <option value="low">Low Stock</option>
          <option value="available">Available</option>
        </select>
      </div>

      {/* Table */}
      {/* <div className="overflow-x-auto"> */}
      <div className="overflow-auto max-h-[calc(100vh-200px)] border rounded">
        <table className="min-w-full border bg-white rounded shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Unit</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const { text, color } = getStockStatus(product.stock);
              return (
                <tr
                  key={product.id}
                  className="hover:bg-blue-50 cursor-pointer"
                  onDoubleClick={() => setSelectedProduct(product)}
                >
                  <td className="py-2 px-4 border-b">
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center overflow-hidden rounded-lg shadow-md">
                      {product.image_url ? (
                        <img
                          src={`http://172.25.10.26:5000/${product.image_url}`}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">No Image</span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b max-h-20 overflow-y-auto whitespace-normal break-words">
                    {product.description}
                  </td>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.price}</td>
                  <td className="py-2 px-4 border-b">{product.stock}</td>
                  <td className="py-2 px-4 border-b">{product.unit}</td>
                  <td className={`py-2 px-4 border-b font-bold ${color}`}>
                    {text}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={handleProductUpdate}
          fetchProducts={fetchProducts}
        />
      )}

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { getAllProducts } from "../services/productServices";
// import ProductDetail from "./ProductDetail";
// import AddProductModal from "./AddProductModal";

// export default function ProductTable() {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);

//   useEffect(() => {
//     async function fetchProducts() {
//       const token = sessionStorage.getItem("access_token");
//       const data = await getAllProducts(token);
//       setProducts(data);
//     }
//     fetchProducts();
//   }, []);

//   const getStockStatus = (stock) => {
//     if (stock <= 0) return { text: "Out of Stock", color: "text-red-600" };
//     if (stock < 10) return { text: "Low Stock", color: "text-orange-500" };
//     return { text: "Available", color: "text-green-600" };
//   };

//   const handleProductUpdate = (updatedProduct) => {
//     if (updatedProduct) {
//       setProducts((prevProducts) =>
//         prevProducts.map((prod) =>
//           prod.id === updatedProduct.id ? updatedProduct : prod
//         )
//       );
//     } else {
//       setProducts((prevProducts) =>
//         prevProducts.filter((prod) => prod.id !== selectedProduct.id)
//       );
//     }

//     setSelectedProduct(null);
//   };

//   const handleProductAdded = (newProduct) => {
//     setProducts((prevProducts) => [...prevProducts, newProduct]);
//   };

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Product List</h2>
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           + Add Product
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full border bg-white rounded shadow-md">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="py-2 px-4 border-b">Image</th>
//               <th className="py-2 px-4 border-b">Category</th>
//               <th className="py-2 px-4 border-b">Description</th>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Price</th>
//               <th className="py-2 px-4 border-b">Stock</th>
//               <th className="py-2 px-4 border-b">Unit</th>
//               <th className="py-2 px-4 border-b">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => {
//               const { text, color } = getStockStatus(product.stock);
//               return (
//                 <tr
//                   key={product.id}
//                   className="hover:bg-blue-50 cursor-pointer"
//                   onClick={() => setSelectedProduct(product)}
//                 >
//                   <td className="py-2 px-4 border-b">
//                     {product.image ? (
//                       <img
//                         src={product.image}
//                         alt={product.name}
//                         className="h-16 w-16 object-cover rounded"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No Image</span>
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border-b">{product.category}</td>
//                   <td className="py-2 px-4 border-b max-h-20 overflow-y-auto whitespace-normal break-words">
//                     {product.description}
//                   </td>
//                   <td className="py-2 px-4 border-b">{product.name}</td>
//                   <td className="py-2 px-4 border-b">{product.price}</td>
//                   <td className="py-2 px-4 border-b">{product.stock}</td>
//                   <td className="py-2 px-4 border-b">{product.unit}</td>
//                   <td className={`py-2 px-4 border-b font-bold ${color}`}>
//                     {text}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {selectedProduct && (
//         <ProductDetail
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//           onUpdate={handleProductUpdate}
//         />
//       )}

//       <AddProductModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onProductAdded={handleProductAdded}
//       />
//     </div>
//   );
// }
