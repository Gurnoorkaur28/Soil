//count handler for add to cart
const QuantityHandler = ({ item, handleQuantityChange }) => {
  const handleIncrease = () => {
    handleQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.id, item.quantity - 1);
    }
  };
  //buttons for quantity
  return (
    <div className="count">
      <button onClick={handleDecrease}>-</button>
      <span>{item.quantity}</span>
      <button onClick={handleIncrease}>+</button>
    </div>
  );
};
export default QuantityHandler;
