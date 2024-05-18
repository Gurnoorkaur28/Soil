import React, { useState, useEffect } from "react";
import { getSpecialProducts } from "../data/productsData";  // getting data from backend via productsData

const SpecialProductsList = () => {
    const [specialProducts, setSpecialProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpecialProducts = async () => {
            try {
                const products = await getSpecialProducts();
                setSpecialProducts(products);
            } catch (error) {
                console.error('Failed to fetch special products:', error);
                setError(error.message);
            }
        };

        fetchSpecialProducts();
    }, []);

    if (error) {
        return <p>Error loading special products: {error}</p>;
    }

    return (
        
  <div className="cartContainer">
    <h2>Specials for the Week</h2>
    <ul>
    {specialProducts.map(({ special_id, discounted_price, product }) => (
        <li key={special_id} className="cartItem">
          <img 
            src={`/images/${product.image}`}
            alt={product.name}
            className="itemImg"
          />
          <div className="text">
            <p>{product.name}</p>
            <span>Original Price: ${product.price.toFixed(2)} </span> -
            <span>
              Discounted Price: ${discounted_price.toFixed(2)}
            </span>
            <p> {product.description}</p>
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



export default SpecialProductsList;
