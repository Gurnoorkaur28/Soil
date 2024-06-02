import { useEffect, useState } from "react";
import  { getUser, getUserName } from "../data/repository";
import useCart from "../hooks/useCart";
//presented after completing purchase
const Summary = () => {
  const { cartItems, totalPrice } = useCart(); // Get cartItems and totalPrice from useCart hook
  //get user name
  const [username, setUsername] = useState(getUser());
  const [name, setName] = useState(null);
  //fetching user name
  useEffect(() => {
    const fetchUserName = async () => {
      if (username) {
        const fetchedName = await getUserName(username);
        setName(fetchedName);
      }
    };

    fetchUserName();
  }, [username]);

  return (
    /* container for displaying summary*/
    <div className="summary-container">
      <h3>Your order has been successfully placed</h3>
      <div className="order-summary-card">
        <h3>Order Summary</h3>
        {/*presented user details*/}
        <div className="user-details-card">
          <h4>Your details</h4>
          <p>Username: {username}</p>
          <p>Name: {name}</p>
        </div>
        {/*list of products purchased */}
        <ul className="cart-items-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item-card">
              <img
                src={`/images/${item.product.image}`}
                alt={item.product.name}
                className="item-img"
              />
              <div className="cart-text">
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
        <div className="total-price">
          <strong>Total price:</strong> ${totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Summary;
