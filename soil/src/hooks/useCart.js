import React, { useEffect, useState } from "react";
//importing functions from products data(async functions)
import {
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../data/productsData";
import { getUser, getUserId } from "../data/repository";

const useCart = () => {
  //state to manage userId
  const [id, setId] = useState(null);
  //state to manage cart items
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //state to manage total price
  const [totalPrice, setTotalPrice] = useState(0);
  //state to manage cart count
  const [cartItemCount, setCartItemCount] = useState(0);
  // Fetch userId
  useEffect(() => {
    const user = getUser();
    const fetchUserId = async () => {
      const id = await getUserId(user);
      setId(id); //setting state
    };
    fetchUserId();
  }, []);
  //fetching the cart items of fetched userId
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!id) return; // If no user ID, exit function
      setLoading(true);
      try {
        const cart = await getUserCart(id);
        setCartItems(cart.cartItems || []);
        setCartItemCount(cart.cartItems.length); // update cart item count
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [id]);
  /**
   * calculating total price of cartItems
   * Calculate price based on whether the product has a special discounted price
   * Then multiplying with quantity
   */
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (!cartItems) return;
      const total = (cartItems || []).reduce((acc, item) => {
        const price =
          item.product.specialProducts &&
          item.product.specialProducts.length > 0
            ? item.product.specialProducts[0].discounted_price
            : item.product.price;
        return acc + price * item.quantity;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  //calculating cart item count ,settting count to cartItem length
  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  //adding item to user's cart
  const addItem = async (productId, quantity = 1) => {
    try {
      await addItemToCart(id, productId, quantity);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems || []);
      setCartItemCount(cart.cartItems.length); // update cart item count
    } catch (error) {
      setError(error);
    }
  };
  //quanity change
  const handleQuantityChange = async (productId, quantity) => {
    try {
      await updateCartItemQuantity(id, productId, quantity);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems || []);
    } catch (error) {
      setError(error);
    }
  };
  //removing item
  const removeItem = async (cartId, productId) => {
    try {
      await removeCartItem(cartId, productId);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems || []);
      setCartItemCount(cart.cartItems.length); // update cart item count
    } catch (error) {
      setError(error);
    }
  };

  return {
    id, // Export the user
    cartItems,
    cartItemCount,
    loading,
    error,
    totalPrice,
    addItem,
    handleQuantityChange,
    removeItem,
  };
};

export default useCart;
