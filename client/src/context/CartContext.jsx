import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      toast.error("Item already in cart");
      return;
    }

    setCart([...cart, item]);
    toast.success("Added to Cart");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.success("Removed from Cart");
  };

  const placeOrder = (order) => {
    setOrders([...orders, order]);
    setCart([]);
    toast.success("Order Placed Successfully");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart, // ✅ IMPORTANT
        addToCart,
        removeFromCart,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};