import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { getProducts } from "../data/productsData";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";
// ProductList component displays a list of products with add to cart functionality
const ProductList = () => {
  const [products, setProducts] = useState([]); // state to store product data
  const { addItem, id } = useCart(); //use cart hook to manage cart
  const [error, setError] = useState(null);
  //fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts(); //get products from api
        setProducts(products); // Update state with fetched products
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  /**
   * Handle add to cart functionality
   * Ensures that user is looged in before adding to cart
   * using use cart hook
   * ensuring initial quantity to be 1
   */
  const handleAddToCart = (productId) => {
    if (!id) {
      alert("You need to be logged in to add items to the cart.");
      return;
    }
    addItem(productId, 1);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container fluid>
      <Row>
        {/* Iterate over the products array */}
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
            >
              <Card.Img
                variant="top"
                src={`/images/${product.image}`}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {/* Check if there are special products */}
                {product.specialProducts &&
                product.specialProducts.length > 0 ? (
                  <>
                    {/* Regular price */}
                    <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                    {/* if special item then special price with a badge */}
                    <Card.Text>
                      Special Price: $
                      {product.specialProducts[0].discounted_price.toFixed(2)}
                      <Badge bg="success" style={{ marginLeft: "10px" }}>
                        Special Offer
                      </Badge>
                    </Card.Text>
                  </>
                ) : (
                  <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
