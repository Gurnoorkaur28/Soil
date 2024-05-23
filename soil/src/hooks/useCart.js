import { useState, useEffect } from 'react';
import { getUserCart, addToCart, updateCartItem, removeCartItem } from '../data/productsData'; // Update the import path accordingly

const useCart = (email) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getUserCart(email);
        setCartItems(items.cartItems);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, [email]);
  
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const newItem = await addToCart({ email, productId, quantity });
      setCartItems(currentItems => [...currentItems, newItem]);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      const updatedItem = await updateCartItem({ cartItemId, quantity });
      setCartItems(currentItems =>
        currentItems.map(cartItem =>
          cartItem.id === cartItemId ? updatedItem : cartItem
        )
      );
    } catch (error) {
      console.error('Failed to update cart item:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await removeCartItem(cartItemId);
      setCartItems(currentItems => currentItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  return {
    cartItems,
    totalPrice,
    handleAddToCart,
    handleQuantityChange,
    removeFromCart,
  };
};

export default useCart;
