import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
  FaBookOpen,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbar = ({ search, setSearch }) => {
  const { cart, getTotalItems } = useContext(CartContext);
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-50/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link to="/" className="group flex items-center gap-3">
              {/* Logo Container - Removed filters so your image shows correctly */}
              <div className="bg-amber-500  rounded-xl shadow-md transition-transform group-hover:rotate-[-8deg]">
                <img
                  src={logo}
                  alt="Book Store Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <span className="hidden sm:block text-2xl font-black tracking-tighter text-slate-800 italic">
                BOOK <span className="text-amber-500">STORE</span>
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {["Books", "Stationery", "Toys"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-amber-600 hover:bg-amber-50 transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8 hidden md:block relative">
            <div
              className={`relative flex items-center transition-all duration-300 rounded-2xl border-2 ${
                isFocused
                  ? "border-amber-500 bg-white ring-4 ring-amber-500/10"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <div className="pl-4">
                <FaBookOpen
                  className={`transition-colors ${isFocused ? "text-amber-500" : "text-slate-400"}`}
                  size={16}
                />
              </div>
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={search}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent px-3 py-3 text-sm outline-none font-medium text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-3 group rounded-2xl hover:bg-amber-50 transition-all"
            >
              <FaShoppingCart
                size={22}
                className="text-slate-600 group-hover:text-amber-600"
              />
              {getTotalItems() > 0 && (
                <span className="absolute top-2 right-2 bg-amber-600 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white shadow-lg shadow-amber-200">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Section - Show greeting when logged in, otherwise show Sign In */}
            {user ? (
              <div className="hidden   sm:flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200">
                  <FaUser className="text-amber-600" size={16} />
                  <span className="text-sm font-bold text-amber-800">
                    Hi, {user.username}!
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-slate-800 text-white hover:bg-slate-700 transition-all font-medium"
                  title="Logout"
                >
                  <FaSignOutAlt size={14} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:block px-7 py-3 rounded-xl text-sm bg-amber-600 text-white transition-all hover:shadow-slate-200 active:scale-95 font-sans font-medium"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100"
            >
              {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen border-t border-slate-100" : "max-h-0"}`}
      >
        <div className="p-6 space-y-4 bg-white">
          <div className="relative flex items-center bg-slate-50 rounded-2xl border border-slate-200 px-4">
            <FaSearch className="text-slate-400" size={14} />
            <input
              type="text"
              className="bg-transparent w-full p-4 text-sm outline-none font-medium"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {["Home", "Books", "Stationery", "Toys", "Orders"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
            >
              {item}
            </Link>
          ))}
          {/* Mobile User Section */}
          {user ? (
            <div className="space-y-3 pt-4  border-t border-slate-100">
              <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 rounded-xl border border-amber-200">
                <FaUser className="text-amber-600" size={18} />
                <div>
                  <p className="text-sm font-bold text-amber-800">
                    Hi, {user.username}!
                  </p>
                  <p className="text-xs text-amber-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors"
              >
                <FaSignOutAlt size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-4 rounded-2xl bg-slate-900 text-white font-black"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
