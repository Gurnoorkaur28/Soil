import axios from "axios";
import { API_HOST } from "../utils/constants";

// Products (Items)
async function getProducts() {
  const response = await axios.get(`${API_HOST}/api/products`);
  return response.data;
}

async function getProductById(id) {
  const response = await axios.get(`${API_HOST}/api/products/${id}`);
  return response.data;
}

async function createProduct(product) {
  const response = await axios.post(`${API_HOST}/api/products`, product);
  return response.data;
}

async function updateProduct(id, product) {
  const response = await axios.put(`${API_HOST}/api/products/${id}`, product);
  return response.data;
}

async function deleteProduct(id) {
  const response = await axios.delete(`${API_HOST}/api/products/${id}`);
  return response.data;
}

// Special Products
async function getSpecialProducts() {
  const response = await axios.get(`${API_HOST}/api/specialProducts`);
  return response.data;
}
// Cart
async function addToCart(cartItem) {
  const response = await axios.post(`${API_HOST}/api/cartItem`,cartItem);
  return response.data;
}

async function getUserCart(email) {
  const response = await axios.get(`${API_HOST}/api/cart/user-cart/${email}`);
  return response.data;
}

async function updateCartItem(cartItem) {
  const response = await axios.put(`${API_HOST}/api/cart/update-cart-item`, cartItem);
  return response.data;
}

async function removeCartItem(cartItemId) {
  const response = await axios.delete(`${API_HOST}/api/cart/remove-cart-item`, { data: { cartItemId } });
  return response.data;
}


export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSpecialProducts,
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  
};

