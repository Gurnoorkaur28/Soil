import "./App.css";

// React imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import MessageContext from "./context/MessageContext";

// Path for Routes
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";

// Products path for routes imports
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

// Specials path for routes imports
import Specials from "./pages/Specials";
import CreateSpecial from "./pages/CreateSpecial";
import EditSpecial from "./pages/EditSpecial";

// Reviews
import Reviews from "./pages/Reviews";
import Metrics from "./pages/Metrics";

function App() {
  const [message, setMessage] = useState(null);

  // Code/concept taken from RMIT - COSC2758 Wk09 Lec Code
  // Set msg to null after a some  time.
  useEffect(() => {
    if (message === null) return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When msg changes clear the  timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div className="App d-flex flex-column min-vh-100">
      <MessageContext.Provider value={{ message, setMessage }}>
        <Router>
          {/* Navbar */}
          <Navbar />
          {/* Page Routes */}
          <main>
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/products" element={<Products />} />
                <Route path="/createProduct" element={<CreateProduct />} />
                <Route path="/editProduct/:id" element={<EditProduct />} />
                <Route path="/specials" element={<Specials />} />
                <Route path="/createSpecial" element={<CreateSpecial />} />
                <Route
                  path="/editSpecial/:specialId"
                  element={<EditSpecial />}
                />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/metrics" element={<Metrics />} />
              </Routes>
            </Container>
          </main>
        </Router>
      </MessageContext.Provider>
    </div>
  );
}

export default App;
