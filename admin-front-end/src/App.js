import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Specials from "./pages/Specials";
import Users from "./pages/Users";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
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
              <Route path="/specials" element={<Specials />} />
            </Routes>
          </Container>
        </main>
      </Router>
    </div>
  );
}

export default App;
