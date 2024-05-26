import React, { useState } from 'react';

const QuantityHandler = ({ item, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.productId, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.productId, newQuantity);
    }
  };

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(item.productId, newQuantity);
    }
  };

  return (
    <div className="quantity-handler">
      <button onClick={handleDecrement} className="quantity-button">-</button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="quantity-input"
        min="1"
      />
      <button onClick={handleIncrement} className="quantity-button">+</button>
    </div>
  );
};

export default QuantityHandler;
