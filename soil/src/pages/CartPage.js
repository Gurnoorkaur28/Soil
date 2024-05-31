import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuantityHandler from '../components/QuantityHandler';
import useCart from '../hooks/useCart';

const CartPage = () => {
  const navigate = useNavigate();
  //getting hooks from useCart
  const { cartItems, totalPrice, handleQuantityChange, removeItem } = useCart();
 //handling checkout 
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="cartContainer">
      <h1>Cart Items</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cartItem">
              <img
                src={`/images/${item.product.image}`}
                alt={item.product.name}
                className="itemImg"
              />
              <div className="cartText">
                <p>{item.product.name}</p>
                {item.product.specialProducts && item.product.specialProducts.length > 0 ? (
                  <span>
                    Price: <del>${item.product.price.toFixed(2)}</del> {' '}
                    <span style={{ color: 'red' }}>
                      ${item.product.specialProducts[0].discounted_price.toFixed(2)}
                    </span>
                  </span>
                ) : (
                  <span>Price: ${item.product.price.toFixed(2)}</span>
                )}
                <QuantityHandler
                  item={item}
                  onQuantityChange={(productId, quantity) =>
                    handleQuantityChange(productId, quantity)
                  }
                />
                <button
                  onClick={() => removeItem(item.cart_id, item.productId)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="totalPrice">
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
      </div>
      <button className="checkout" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
