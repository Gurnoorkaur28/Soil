import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import useCart from "../hooks/useCart";

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const {  cartItemCount = []} = useCart();
  
  const handleLogout = () => {
    props.logoutUser();
    navigate("/");
  };

  return (
    <Stack direction="horizontal" gap={1}>
      {/* Logo */}
      <img className="p-2 logo" src="Lsoil.png" alt="Soil Logo" />

      {/* Spacer */}
      <div className="ms-auto"></div>

      {/**
       * Login
       * Checks if username is set if yes displays user's name else
       * shows button depending on what page user is on
       * and if user is logged in also displays logout button
       **/}
      {props.username === null ? (
        // Login signup button
        location.pathname === "/login" ? (
          <Link className="p-2" to="/signup">
            <Button variant="success">SignUp</Button>
          </Link>
        ) : (
          <Link className="p-2" to="/login">
            <Button variant="success">Login</Button>
          </Link>
        )
      ) : (
        // User Name
        <div className="p-2">
          <Link to="/profile" className="plainLink">
            Welcome, {props.name}
          </Link>
          <Button variant="success" onClick={handleLogout} className="ms-2">
            Logout
          </Button>
        </div>
      )}

      {/* Cart */}
      <Link className="p-2 mr-2" to="/cart">
        <Button variant="success">
          <img
            src="shopping-cart-icon.png"
            alt="Shopping Cart"
            className="cart-logo"
            />
            
            <span className="cart-counter ">{cartItemCount}</span>
          </Button>
      </Link>
    </Stack>
  );
}

export default Header;
