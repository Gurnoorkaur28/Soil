import React from "react";
import { useNavigate } from "react-router-dom";
import QuantityHandler from "../components/QuantityHandler";
import useCart from "../hooks/useCart"; 

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, handleQuantityChange, removeFromCart } = useCart();

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
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="cartItem">
                <img
                  src={`/images/${item.image}`}
                  alt={item.name}
                  className="itemImg"
                />
                <div className="cartText">
                  <p>{item.name}</p>
                  <span>Price: ${item.price.toFixed(2)}</span> -
                  <span>Quantity: {item.quantity}</span>
                  <div className="count">
                    <QuantityHandler
                      item={item}
                      handleQuantityChange={handleQuantityChange}
                    />
                  </div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromCart(item.id);
                    }}
                    className="remove-link"
                  >
                    Remove
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <strong>Total price:</strong> ${totalPrice.toFixed(2)}
          </div>
        </>
      )}
      <button className="checkout" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
