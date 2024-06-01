import axios from "axios";
import { API_HOST } from "../utils/constants";

// Products (Items)
//getting all the products from api
async function getProducts() {
  const response = await axios.get(`${API_HOST}/api/products`);
  return response.data;
}
//getting products by specific id
async function getProductById(id) {
  const response = await axios.get(`${API_HOST}/api/products/${id}`);
  return response.data;
}


// Cart
//getting cart items of user
async function getUserCart(userId) {
  const response = await axios.get(`${API_HOST}/api/cartItem/${userId}`);
  return response.data;
}
//adding items to cart of user,witj initial quantity of 1
async function addItemToCart(userId, productId, quantity = 1) {
  const response = await axios.post(`${API_HOST}/api/cartItem/${userId}/item`, {
    productId,
    quantity,
  });
  return response.data;
}
//updating quanity
async function updateCartItemQuantity(userId, productId, quantity) {
  const response = await axios.put(`${API_HOST}/api/cartItem/${userId}/item/${productId}`, {
    quantity,
  });
  return response.data;
}
//removing items from cart
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
//getting all the reviews for product according to product ids
async function getReviewsByProductId(productId) {
  const response = await axios.get(`${API_HOST}/api/review/${productId}`);
  return response.data;
};
//user adding their reviews for product
async function addReview(userId, productId, review) {
  const response = await axios.post(`${API_HOST}/api/review/${userId}/${productId}`, review);
  return response.data;
}
//updating reviews
async function updateReview(userId, productId, reviewId, review) {
  const response = await axios.put(`${API_HOST}/api/review/${userId}/${productId}/${reviewId}`, review);
  return response.data;
}
//deleting reviews
async function deleteReview(userId, productId, reviewId) {
  const response = await axios.delete(`${API_HOST}/api/review/${userId}/${productId}/${reviewId}`);
  return response.data;
}
// Follow and Unfollow
async function followUser(followerId, followingId) {
  const response = await axios.post(`${API_HOST}/api/follow/${followerId}/${followingId}`);
  return response.data;
}
//unfollow user
async function unfollowUser(followerId, followingId) {
  const response = await axios.delete(`${API_HOST}/api/follow/${followerId}/${followingId}`);
  return response.data;
}
// Get Following Status
async function getFollowingStatus(userId) {
  const response = await axios.get(`${API_HOST}/api/follow/${userId}`);
  return response.data;
}
//exporting functions
export {
  getProducts,
  getProductById,
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

