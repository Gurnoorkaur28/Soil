import React, { useEffect, useState } from "react";
import {
  getUserCart,
  addItemToCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../data/productsData";
import { getUser, getUserId } from "../data/repository";

const useCart = () => {
  const [id, setId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = getUser();
    const fetchUserId = async () => {
      const id = await getUserId(user);
      setId(id);
    };
    fetchUserId();
  }, [getUser]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const cart = await getUserCart(id);
        setCartItems(cart.cartItems);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [id]);

  const addItem = async (productId, quantity = 1) => {
    try {
      await addItemToCart(id, productId, quantity);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems);
    } catch (error) {
      setError(error);
    }
  };

  const updateItemQuantity = async (productId, newQuantity) => {
    try {
      await updateCartItemQuantity(id, productId, newQuantity);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems);
    } catch (error) {
      setError(error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeCartItem(id, productId);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems);
    } catch (error) {
      setError(error);
    }
  };

  return {
    cartItems,
    loading,
    error,
    addItem,
    updateItemQuantity,
    removeItem,
  };
};

export default useCart;
