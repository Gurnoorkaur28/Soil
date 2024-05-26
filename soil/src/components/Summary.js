import { useEffect, useState } from "react";
import { getUser, getUserName } from "../data/repository";
import useCart from "../hooks/useCart";

const Summary = () => {
  const { cartItems, totalPrice } = useCart(); // Get cartItems and totalPrice from useCart hook

  return (
    <div className="summary">
      <h3>Your order has been successfully placed</h3>
      <h3>Order Summary</h3>
      <h4>Your details</h4>
      
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cartItem">
            <img
              src={`/images/${item.product.image}`}
              alt={item.product.name}
              className="itemImg"
            />
            <div className="cartText">
              <span>{item.product.name}</span> -
              <span>
                Price: $
                {item.product.specialProducts &&
                item.product.specialProducts.length > 0
                  ? item.product.specialProducts[0].discounted_price.toFixed(2)
                  : item.product.price.toFixed(2)}
              </span>
              -
              <span>Quantity: {item.quantity}</span>
            </div>
            <div className="total">
              Total: $
              {(
                (item.product.specialProducts &&
                item.product.specialProducts.length > 0
                  ? item.product.specialProducts[0].discounted_price
                  : item.product.price) * item.quantity
              ).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <strong>Total price:</strong> ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default Summary;
