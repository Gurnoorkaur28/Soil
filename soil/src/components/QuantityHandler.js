//handling quantity of items in cart
import React, { useState } from 'react';

const QuantityHandler = ({ item, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  //handling increase in quantity
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(item.productId, newQuantity);
  };
   //handling decrease in quantity
  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(item.productId, newQuantity);
    }
  };
 //handling quantity by manually typing,ensuring it should be a number
  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(item.productId, newQuantity);
    }
  };

  return (
    <div className="quantity-handler">
      {/* when user - quanity is decreased */}
      <button onClick={handleDecrement} className="quantity-button">-</button>
       {/* quanity handled by typing (handle change)*/}
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="quantity-input"
        min="1"
      />
       {/* when user + quanity is increased */}
      <button onClick={handleIncrement} className="quantity-button">+</button>
    </div>
  );
};

export default QuantityHandler;
