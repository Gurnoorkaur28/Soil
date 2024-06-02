import React, { useEffect, useState } from "react";
import { Button, Badge } from "react-bootstrap";
import { getProducts } from "../data/productsData"; //getting products
import useCart from "../hooks/useCart"; //getting hook
import { Link } from "react-router-dom";
const SpecialProductList = () => {
  const [products, setProducts] = useState([]);
  const { addItem, id } = useCart(); // Use the useCart hook

  const handleAddToCart = (productId) => {
    //adding items to cart
    if (!id) {
      alert("You need to be logged in to add items to the cart.");
      return;
    }
    addItem(productId, 1);
  };
  // to fetch special products
  useEffect(() => {
    // to fetch special products
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        const specialProducts = allProducts.filter(
          (product) =>
            product.specialProducts && product.specialProducts.length > 0
        );
        setProducts(specialProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="cartContainer">
      <h2>Specials for the Week</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="cartItem">
            <img
              src={`/images/${product.image}`}
              alt={product.name}
              className="itemImg"
            />
            <div className="text">
              <p>{product.name}</p>
              <p>{product.description}</p>
              {product.specialProducts &&
                product.specialProducts.length > 0 && (
                  <>
                    <p>
                      <s>Price: ${product.price.toFixed(2)}</s>
                    </p>
                    <p>
                      Special Price: $
                      {product.specialProducts[0].discounted_price.toFixed(2)}
                      <Badge bg="success" style={{ marginLeft: "10px" }}>
                        Special Offer
                      </Badge>
                    </p>
                  </>
                )}
              <Button
                variant="primary"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </Button>
              <Link to={`/reviews/${product.id}`} className="review-link">
                Reviews
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialProductList;
