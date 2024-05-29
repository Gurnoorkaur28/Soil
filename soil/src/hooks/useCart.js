//import React, { useEffect, useState } from "react";
//import {
  //getUserCart,
  //addItemToCart,
  //updateCartItemQuantity,
 // removeCartItem,
//} from "../data/productsData";
//import { getUser, getUserId } from "../data/repository";

//const useCart = () => {
 // const [id, setId] = useState(null);
 // const [cartItems, setCartItems] = useState([]);
 // const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);

  //useEffect(() => {
   // const user = getUser();
    //const fetchUserId = async () => {
     // const id = await getUserId(user);
     // console.log('User ID:', id);
     // setId(id);
   // };
   // fetchUserId();
 // }, [getUser]);

  //useEffect(() => {
    //const fetchCartItems = async () => {
    //  if (!id) return;
      //setLoading(true);
      //try {
        //const cart = await getUserCart(id);
       // setCartItems(cart.cartItems);
     // } catch (error) {
      //  setError(error);
     // } finally {
     //   setLoading(false);
     // }
    //};
   // fetchCartItems();
  //}, [id]);

  //const addItem = async (productId, quantity = 1) => {
    //try {
     // console.log('Adding item to cart...');
     // await addItemToCart(id, productId, quantity);
     // const cart = await getUserCart(id);
     // console.log('Cart items:', cart.cartItems);
      //setCartItems(cart.cartItems);
  //  } catch (error) {
   //   console.error('Error adding item to cart:', error);
    //  setError(error);
   // }
  //};

  //const handleQuantityChange = async (productId, quantity) => {
   // try {
   //  await updateCartItemQuantity(id, productId, quantity);
    //  const cart = await getUserCart(id);
     // setCartItems(cart.cartItems);
   // } catch (error) {
    // setError(error);
//}
  //};
 
 // const removeItem = async (cartId, productId) => {
    //try {
      //await removeCartItem(cartId, productId);
      //const cart = await getUserCart(id);
      //setCartItems(cart.cartItems);
    //} catch (error) {
     // setError(error);
   // }
  //};

 // return {
    //cartItems,
    //loading,
    //error,
   // addItem,
   // handleQuantityChange,
   // removeItem,
 // };
//};

//export default useCart;
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
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const user = getUser();
    const fetchUserId = async () => {
      const id = await getUserId(user);
      setId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const cart = await getUserCart(id);
        setCartItems(cart.cartItems || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCartItems();
  }, [id]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (!cartItems) return;
      const total = (cartItems || []).reduce((acc, item) => {
        const price = item.product.specialProducts && item.product.specialProducts.length > 0
          ? item.product.specialProducts[0].discounted_price
          : item.product.price;
        return acc + price * item.quantity;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const addItem = async (productId, quantity = 1) => {
    try {
      await addItemToCart(id, productId, quantity);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems || []);
       } catch (error) {
      setError(error);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await updateCartItemQuantity(id, productId, quantity);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems || []);
       } catch (error) {
      setError(error);
    }
  };

  const removeItem = async (cartId, productId) => {
    try {
      await removeCartItem(cartId, productId);
      const cart = await getUserCart(id);
      setCartItems(cart.cartItems || []);
       } catch (error) {
      setError(error);
    }
  };

  return {
    id, // Export the user   
    cartItems,
    loading,
    error,
    totalPrice,
    addItem,
    handleQuantityChange,
    removeItem,
  };
};

export default useCart;
