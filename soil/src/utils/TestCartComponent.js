/**This component is made for testing ,it integrates 
 * the useCart hook providing a way to 
 * interact with and test the hook's behavior 
 * */
import React from 'react';
import useCart from '../hooks/useCart';
//the values returned by the useCart hook
const TestCartComponent = () => {
  const {
    cartItems,
    totalPrice,
    addItem,
    handleQuantityChange,
    removeItem,
  } = useCart();

  return (
    <div>
       {/* Display the total price */}
      <div data-testid="totalPrice">{totalPrice}</div>
      {/* Button to add an item to the cart; calls addItem with product ID 1 and quantity 2 */}
      <button onClick={() => addItem(1, 2)} data-testid="addItem">Add Item</button>
      <button onClick={() => handleQuantityChange(1, 3)} data-testid="changeQuantity">Change Quantity</button>
      {/* Button to remove an item from the cart; calls removeItem with cart ID 1 and product ID 1 */}
      <button onClick={() => removeItem(1, 1)} data-testid="removeItem">Remove Item</button>
      <ul data-testid="cartItems">
        {/* List the items in the cart */}
        {cartItems.map(item => (
          <li key={item.id}>
            {item.product.name} - {item.quantity} x {item.product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCartComponent;
