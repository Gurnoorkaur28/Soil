import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import Specials from "./pages/Specials";
import BackyardVegetableGardening from "./pages/BackyardVegetableGardening";
import Home from "./pages/Home";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Summary from "./components/Summary";
import ReviewsPage from "./pages/ReviewsPage";
import InitializeConstants, {
  getUser,
  removeUser,
  getUserName,
} from "./data/repository";
import { useState } from "react";
import DetailsPreferences from "./pages/DetailsPreferences";
import MealPlan from "./pages/MealPlan";
//import ProductList from "./data/productList";

import ProductList from "./components/productList";
import { useEffect } from "react";

function App() {
  const [username, setUsername] = useState(getUser());
  const [name, setName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if (username) {
        const fetchedName = await getUserName(username);
        setName(fetchedName);
      }
    };

    fetchUserName();
  }, [username]);

  const loginUser = async (username) => {
    setUsername(username);
    setName(await getUserName(username));
  };

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  };

  return (
    <div className="App">
      <Router>
        {/* Adds constants to localstorage at start of application */}
        <InitializeConstants />

        <Header name={name} username={username} logoutUser={logoutUser} />
        <Navbar username={username} />
        <main role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login loginUser={loginUser} />} />

            {/* Conditional render if user is logged in they go to profile page else they will go to login page */}
            <Route
              path="/profile"
              element={
                username ? (
                  <Profile
                    username={username}
                    logoutUser={logoutUser}
                    loginUser={loginUser}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route path="/signup" element={<SignUp loginUser={loginUser} />} />
            <Route path="/specials" element={<Specials />} />
            <Route
              path="/backyard-vegetable-gardening"
              element={<BackyardVegetableGardening />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/reviews/:productId" element={<ReviewsPage />} />
            <Route path="/ProductList" element={<ProductList />} />
            <Route
              path="/mealPlan"
              element={<MealPlan username={username} />}
            />
            {/* Conditional render if user is logged in they go to profile page else they will go to login page */}
            <Route
              path="/detailsPreference"
              element={
                username ? (
                  <DetailsPreferences username={username} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
