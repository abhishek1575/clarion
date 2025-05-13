// services/productService.js
import { API_URL } from "../config";
const API_BASE = `${API_URL}/products`;
// const API_BASE = `${API_URL}/api`;

export const getAllProducts = async (token) => {
  const response = await fetch(`${API_BASE}/get_all_products`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const updateProduct = async (id, data, token) => {
  console.log("Update product data:", data, id, token);

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description || "");
  formData.append("price", data.price);
  formData.append("unit", data.unit);
  formData.append("stock", data.stock);
  formData.append("category", data.category);

  if (data.image instanceof File) {
    formData.append("image", data.image); // only append if file is provided
  }

  const response = await fetch(`${API_BASE}/update_product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // DO NOT set 'Content-Type': Let the browser handle it (important for FormData)
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Update failed:", error);
    throw new Error("Failed to update product");
  }

  return response.json();
};


export async function deleteProduct(productId, token) {
  const response = await fetch(`${API_BASE}/delete_product/${productId}`, {
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
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("description", productData.description);
  formData.append("price", productData.price);
  formData.append("unit", productData.unit);
  formData.append("stock", productData.stock);
  formData.append("category", productData.category);

  if (productData.image) {
    formData.append("image", productData.image);
  }

  try {
    const response = await fetch(`${API_BASE}/add_product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to add product");
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return {}; // fallback to empty object
    }
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}


// export async function addProduct(productData, token) {
//   console.log("Adding product:", productData, token);

//   // Create a FormData object for multipart/form-data
//   const formData = new FormData();
//   formData.append("name", productData.name);
//   formData.append("description", productData.description);
//   formData.append("price", productData.price);
//   formData.append("unit", productData.unit);
//   formData.append("stock", productData.stock);
//   formData.append("category", productData.category);

//   if (productData.image) {
//     formData.append("image", productData.image); // image should be a File object
//   }

//   try {
//     const response = await fetch(`${API_BASE}/add_product`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         // Do NOT set 'Content-Type' manually when using FormData
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || "Failed to add product");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error adding product:", error);
//     throw error;
//   }
// }
