// services/productService.js

const API_BASE = "http://172.25.10.26:5000/api";

export const getAllProducts = async (token) => {
  const response = await fetch(`${API_BASE}/get_all_products`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Product image URL:", response.image_url);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const updateProduct = async (id, data, token) => {
  console.log("Update product data:", data, id, token);
  const response = await fetch(`${API_BASE}/update_product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Update failed:", error);
    throw new Error("Failed to update product");
  }

  return response.json();
};

export async function deleteProduct(productId, token) {
  const response = await fetch(`${API_BASE}/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}

export async function addProduct(productData, token) {
  console.log("Adding product:", productData, token);

  // Create a FormData object for multipart/form-data
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("unit", productData.unit);
  formData.append("stock", productData.stock);
  formData.append("category", productData.category);

  if (productData.image) {
    formData.append("image", productData.image); // image should be a File object
  }

  try {
    const response = await fetch(`${API_BASE}/add_products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Do NOT set 'Content-Type' manually when using FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add product");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// export async function addProduct(productData, token) {
//   console.log("Adding product:", productData, token);
//   try {
//     const response = await fetch(`${API_BASE}/add_products`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(productData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to add product");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error adding product:", error);
//     throw error;
//   }
// }
