import { useState, useEffect } from "react";
import { isLoggedIn } from "../data/repository";

// Custom hook to manage the shopping cart state and logic
const useCart = () => {
  // Initialized cartItems state with localStorage data or an empty array
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || []
  );

  // Initialize totalPrice state
  const [totalPrice, setTotalPrice] = useState(0);

  //update totalPrice whenever cartItems changes
  useEffect(() => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    setTotalPrice(total);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (!isLoggedIn()) {
      alert("Please login or sign up to modify the cart.");
      return;
    }

    // Create a new array with updated cart item quantities
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Update cartItems state and localStorage
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  // to remove an item from the cart
  const removeFromCart = (itemId) => {
    if (!isLoggedIn()) {
      alert("Please login or sign up to modify the cart.");
      return;
    }

    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return {
    cartItems,
    totalPrice,
    handleQuantityChange,
    removeFromCart,
    setCartItems,
  };
};

export default useCart;
