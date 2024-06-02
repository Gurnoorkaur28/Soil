import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* App Logo */}
      <Link className="navbarLogo" to="/">
        SOIL ADMIN
      </Link>
      {/* Page Links */}
      <div className="navbarMenu">
        <Link className="navbarItem" to="/">
          Home
        </Link>
        <Link className="navbarItem" to="/users">
          Users
        </Link>
        <Link className="navbarItem" to="/products">
          Products
        </Link>
        <Link className="navbarItem" to="/specials">
          Specials
        </Link>
        <Link className="navbarItem" to="/reviews">
          Reviews
        </Link>
        <Link className="navbarItem" to="/metrics">
          Metrics
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
