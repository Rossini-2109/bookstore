import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import logo from "../assets/logo.png";
const Navbar = ({ search, setSearch, dark, setDark }) => {
  const { cart } = useContext(CartContext);
  

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo */}
        <img src={logo} alt="PageTurn" className="h-10" />

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/stationery">Stationery</Link>
          <Link to="/toys">Toys</Link>
          <Link to="/orders">Orders</Link>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 rounded text-black"
          />

          {/* Cart */}
          <Link to="/cart">
            <div className="relative cursor-pointer">
              <FaShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            </div>
          </Link>

          {/* Dark Mode Button */}
          <button
            onClick={() => setDark(!dark)}
            className="bg-gray-700 text-white px-3 py-1 rounded"
          >
            {dark ? "Light" : "Dark"}
          </button>

          {/* Login */}
          <Link
            to="/login"
            className="bg-yellow-500 px-3 py-1 rounded text-black"
          >
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;