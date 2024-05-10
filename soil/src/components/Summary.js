import { useEffect, useState, useMemo } from "react";
import { getUser, getUserName } from "../data/repository";
const Summary = () => {
  // Retrieve cart items from local storage and memoize the result
  const cartItems = useMemo(
    () => JSON.parse(localStorage.getItem("cartItems")) || [],
    []
  );

  // Initialize the total price to 0
  const [totalPrice, setTotalPrice] = useState(0);
  // Get the user's email and name
  const userEmail = getUser();
  const userName = getUserName(userEmail);

  // Calculate the total price of all the items in the cart
  useEffect(() => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price * item.quantity;
    }
    setTotalPrice(total);
    localStorage.setItem("ordersPlaced", JSON.stringify(cartItems));
    localStorage.removeItem("cartItems"); // Clear the cart items from local storage
  }, [cartItems]);

  return (
    <div className="summary">
      <h3>Your order has been successfully placed</h3>
      <h3>Order Summary</h3>
      <h4>Your details</h4>
      <p>Name: {userName}</p>
      <p>Email: {userEmail}</p>

      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="cartItem">
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              className="itemImg"
            />
            <div className="cartText">
              <span>{item.name}</span> -<span>Price: ${item.price}</span>-
              <span>Quantity: {item.quantity}</span>
            </div>
            <div className="total">
              Total: ${(item.price * item.quantity).toFixed(2)}
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
