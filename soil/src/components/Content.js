import React from "react";
//import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const Content = () => {
  return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src="images/Diary.png" />
        <Card.Body>
          <Card.Title>Diary</Card.Title>
          <Card.Text>Find fresh diary here</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/Fruits.png" />
        <Card.Body>
          <Card.Title>Fruits & vegetables</Card.Title>
          <Card.Text>Variety of fresh vegetables</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/bakery.jpeg" />
        <Card.Body>
          <Card.Title>Bakery</Card.Title>
          <Card.Text>Freshly baked products from soil Bakery</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/pantry.png" />
        <Card.Body>
          <Card.Title>Pantry</Card.Title>
          <Card.Text>Pluses and flours</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/deli.png" />
        <Card.Body>
          <Card.Title>Deli</Card.Title>
          <Card.Text>Fresh Deli</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/household.png" />
        <Card.Body>
          <Card.Title>Household</Card.Title>
          <Card.Text>Household items</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/drinks.png" />
        <Card.Body>
          <Card.Title>Drinks & Juices</Card.Title>
          <Card.Text>Fresh Deli</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/glutenFree.png" />
        <Card.Body>
          <Card.Title>Gluten Free</Card.Title>
          <Card.Text>gluten Free Food</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Img variant="top" src="images/lactose.png" />
        <Card.Body>
          <Card.Title>Lactose Free</Card.Title>
          <Card.Text>checkout lactose free dairy</Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );
};

export default Content;
