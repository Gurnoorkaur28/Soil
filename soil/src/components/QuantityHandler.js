import React from 'react';

const QuantityHandler = ({ item, handleQuantityChange }) => {
  const handleIncrease = () => {
    handleQuantityChange(item.cart_id, item.productId, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.cart_id, item.productId, item.quantity - 1);
    }
  };

  return (
    <div className="count">
      <button onClick={handleDecrease}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};

export default QuantityHandler;
