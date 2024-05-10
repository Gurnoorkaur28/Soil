import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { isLoggedIn } from "../data/repository";
import { ITEMS } from "../utils/constants";

const Items = () => {
  const [cartItems, setCartItems] = useState([]);
  //cheching if user is looged in
  const addToCart = (item) => {
    if (!isLoggedIn()) {
      alert("Please log in or sign up to add items to the cart.");
      return;
    }

    // Apply discount if item is special
    const discountItem = applyDiscount(item);
    const existingItem = cartItems.find((i) => i.id === discountItem.id);
    //checking if discount item already exist in cart and incrementing quantity
    if (existingItem) {
      existingItem.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      discountItem.quantity = 1;
      setCartItems([...cartItems, discountItem]);
    }
    updateLocalStorage(discountItem);
  };

  const applyDiscount = (item) => {
    // Check if the item is a special item and apply a 50% discount
    if ([21, 22, 23, 24].includes(item.id)) {
      return { ...item, price: item.price * 0.5 };
    }
    return item;
  };

  //checking if item is already in local storage
  const updateLocalStorage = (item) => {
    const updatedCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemInStorage = updatedCartItems.find(
      (i) => i.id === item.id
    );
    //if  item already exist in cart , incrementing quantity
    if (existingItemInStorage) {
      existingItemInStorage.quantity += 1;
    } else {
      updatedCartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  // setting items as special
  const isSpecialItem = (id) => {
    return [21, 22, 23, 24].includes(id);
  };

  return (
    <Container fluid>
      <Row>
        {ITEMS.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
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
                src={`/images/${item.image}`}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Card.Body style={{ flexGrow: 1 }}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Title>{item.description}</Card.Title>
                <Card.Text>
                  Price: ${item.price.toFixed(2)}
                  {isSpecialItem(item.id) && (
                    <Badge bg="success" style={{ marginLeft: "10px" }}>
                      50% OFF
                    </Badge>
                  )}
                </Card.Text>
                <Button variant="primary" onClick={() => addToCart(item)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Items;
