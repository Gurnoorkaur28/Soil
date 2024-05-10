import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import { Link } from "react-router-dom";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/backVegetable.png"
          alt="First slide"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Carousel.Caption
          style={{ left: "20px", textAlign: "left", width: "90%" }}
        >
          {index === 0 && (
            <Link to="/specials" onClick={() => console.log("Link clicked")}>
              {" "}
              {/* Directly wrap button with Link */}
            </Link>
          )}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/grocery.png"
          alt="Second slide"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Carousel.Caption
          style={{
            left: "20px",
            textAlign: "left",
            width: "90%",
            color: "darkgreen",
          }}
        >
          <p style={{ color: "darkgreen" }}>
            Don't have time to go store to buy grocery, Don't worry
          </p>
          <h3 style={{ color: "darkgreen" }}>Soil is now online!</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/NewRange.png"
          alt="Third slide"
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Carousel.Caption
          style={{
            left: "20px",
            textAlign: "left",
            width: "90%",
            color: "darkgreen",
          }}
        >
          <h2 style={{ color: "darkgreen" }}>New Range launching soon!</h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
