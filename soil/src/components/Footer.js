import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-us">
        <Link to="/" className="home-link plainLink">
          Home
        </Link>
        <h3>Contact Us</h3>
        <li>Phone: 123-456-7890</li>
        <li>Email: contact@soilstore.com</li>
      </div>

      <div className="stores">
        <h3>Stores</h3>
        <p>Soil at Melbourne Central Station</p>
        <p>Soil at Essendon Mt Alexander Rd</p>
        <p>Soil at Broadmeadows Central</p>
      </div>
    </div>
  );
};

export default Footer;
