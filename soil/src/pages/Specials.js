import React, { useState, useEffect } from "react";

// Defined the key for storing specials in local storage
const SPECIALS_KEY = "specials";

function Specials() {
  // Initialized state for specials and set it to an empty array
  const [specials, setSpecials] = useState([]);

  //useEffect hook to fetch specials data from local storage
  useEffect(() => {
    const storedSpecials = JSON.parse(localStorage.getItem(SPECIALS_KEY));
    if (storedSpecials) {
      setSpecials(storedSpecials);
    } else {
      // If there is no specials  in local storage, set it to the following data
      const specialsData = [
        {
          id: 21,
          name: "Blueberries",
          description: "Special discount on blueberries!",
          price: 4.05,
          discountedPrice: 2.025,
          image: "blueberries.png",
        },
        {
          id: 22,
          name: "Cottage Cheese",
          description: "Special offer on cottage cheese (per pack)",
          price: 5.55,
          discountedPrice: 2.77,
          image: "cottagecheese.png",
        },
        {
          id: 23,
          name: "Strawberries",
          description: "Special deal on strawberries!",
          price: 4.05,
          discountedPrice: 2.025,
          image: "strawberries.png",
        },
        {
          id: 24,
          name: "Avocado",
          description: "Limited time offer on fresh avocados",
          price: 2.1,
          discountedPrice: 1.05,
          image: "avocado.png",
        },
      ];
      localStorage.setItem(SPECIALS_KEY, JSON.stringify(specialsData));
      // Set state to the new specials data
      setSpecials(specialsData);
    }
  }, []);

  return (
    <div className="cartContainer">
      <h2>Specials for the Week</h2>
      <ul>
        {specials.map((special) => (
          <li key={special.id} className="cartItem">
            <img
              src={`images/${special.name
                .toLowerCase()
                .replace(/\s+/g, "")}.png`}
              alt={special.name}
              className="itemImg"
            />
            <div className="text">
              <p>{special.name}</p>
              <span>Price: ${special.price.toFixed(2)}</span> -
              <span>
                Discounted Price: ${special.discountedPrice.toFixed(2)}
              </span>
              <p>{special.description}</p>
              <span className="badge">Special Offer</span>{" "}
              {/* Badge added here */}
            </div>
          </li>
        ))}
      </ul>
      <footer className="cartFooter">
        <p>For add to cart direct to Home page</p>
      </footer>
    </div>
  );
}

export default Specials;
