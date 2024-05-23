import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { getProducts } from "../data/productsData"; // Update the import path accordingly
import useCart from "../hooks/useCart"; // Update the import path accordingly

const ProductList = ({ email }) => {
  const [products, setProducts] = useState([]);
  const { handleAddToCart } = useCart(email);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container fluid>
      <Row>
        {products.map(product => (
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
                {product.specialProducts && product.specialProducts.length > 0 ? (
                  <>
                    <Card.Text>
                      <s>Price: ${product.price.toFixed(2)}</s>
                    </Card.Text>
                    <Card.Text>
                      Special Price: ${product.specialProducts[0].discounted_price.toFixed(2)}
                      <Badge bg="success" style={{ marginLeft: "10px" }}>Special Offer</Badge>
                    </Card.Text>
                  </>
                ) : (
                  <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                )}
                <Button variant="primary" onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
