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

// Cart
async function getUserCart(userId) {
  const response = await axios.get(`${API_HOST}/api/cartItem/${userId}`);
  return response.data;
}

async function addItemToCart(userId, productId, quantity = 1) {
  const response = await axios.post(`${API_HOST}/api/cartItem/${userId}/item`, {
    productId,
    quantity,
  });
  return response.data;
}
async function updateCartItemQuantity(userId, productId, quantity) {
  const response = await axios.put(`${API_HOST}/api/cartItem/${userId}/item/${productId}`, {
    quantity,
  });
  return response.data;
}

async function removeCartItem(userId, productId) {
  const response = await axios.delete(`${API_HOST}/api/cartItem/${userId}/item/${productId}`);
  return response.data;
}


// Special Products
async function getSpecialProducts() {
  const response = await axios.get(`${API_HOST}/api/specialProducts`);
  return response.data;
}
//reviews
async function getReviewsByProductId(productId) {
  const response = await axios.get(`${API_HOST}/api/review/${productId}`);
  return response.data;
};
async function addReview(userId, productId, review) {
  const response = await axios.post(`${API_HOST}/api/review/${userId}/${productId}`, review);
  return response.data;
}
async function updateReview(userId, productId, reviewId, review) {
  const response = await axios.put(`${API_HOST}/api/review/${userId}/${productId}/${reviewId}`, review);
  return response.data;
}
async function deleteReview(userId, productId, reviewId) {
  const response = await axios.delete(`${API_HOST}/api/review/${userId}/${productId}/${reviewId}`);
  return response.data;
}
// Follow and Unfollow
async function followUser(followerId, followingId) {
  const response = await axios.post(`${API_HOST}/api/follow/${followerId}/${followingId}`);
  return response.data;
}

async function unfollowUser(followerId, followingId) {
  const response = await axios.delete(`${API_HOST}/api/follow/${followerId}/${followingId}`);
  return response.data;
}
// Get Following Status
async function getFollowingStatus(userId) {
  const response = await axios.get(`${API_HOST}/api/follow/${userId}`);
  return response.data;
}

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSpecialProducts,
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
  getReviewsByProductId,
  addReview,
  updateReview,
  deleteReview,
  followUser,
  unfollowUser,
  getFollowingStatus,
};

