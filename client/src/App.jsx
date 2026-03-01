import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "./context/CartContext";
import Payment from "./pages/Payment"; 
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Navigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/Books";
import Toys from "./pages/Toys";
import Stationery from "./pages/Stationery";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import BookDetails from "./pages/BookDetails";

function App() {
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const { addToCart } = useContext(CartContext);
  const role = localStorage.getItem("role");

  return (
    <div
      className={
        dark
          ? "dark bg-black text-white min-h-screen"
          : "min-h-screen"
      }
    >
      <Navbar
        search={search}
        setSearch={setSearch}
        dark={dark}
        setDark={setDark}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/books"
          element={<Books search={search} addToCart={addToCart} />}
        />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/stationery" element={<Stationery />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/admin"
          element={role === "admin" ? <Admin /> : <Navigate to="/" />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;