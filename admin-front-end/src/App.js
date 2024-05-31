import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Specials from "./pages/Specials";

function App() {
  return (
    <div className="App">
      <Router>
        {/* Navbar */}
        <Navbar />
        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Users />} />
          <Route path="/" element={<Products />} />
          <Route path="/" element={<Specials />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
