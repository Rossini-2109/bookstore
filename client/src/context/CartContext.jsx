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
      // Item exists, increase quantity
      setCart(
        cart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
      toast.success(`${item.title} quantity increased!`);
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...item, quantity: 1 }]);
      toast.success(`${item.title} added to Cart!`);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item,
      ),
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0,
    );
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
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
