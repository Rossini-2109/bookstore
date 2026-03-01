import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const gst = subtotal * 0.05;
  const deliveryFee = subtotal > 1000 ? 0 : 50;

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(subtotal * 0.1);
    } else if (coupon === "SAVE20") {
      setDiscount(subtotal * 0.2);
    } else {
      setDiscount(0);
      alert("Invalid Coupon");
    }
  };

  const total = subtotal + gst + deliveryFee - discount;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("redirectAfterLogin", "/payment");
      alert("Please login to continue checkout");
      navigate("/login");
      return;
    }

    navigate("/payment", { state: { total } });
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-6 rounded shadow">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-3">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white p-6 rounded shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Payment Details
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex mt-4 gap-2">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="border p-2 flex-1 rounded"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="bg-green-500 text-white px-4 rounded"
            >
              Apply
            </button>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              if (cart.length === 0) {
                alert("Your cart is empty");
                return;
              }

              const token = localStorage.getItem("token");

              if (!token) {
                // Save redirect path
                localStorage.setItem("redirectAfterLogin", "/payment");
                alert("Please login to continue checkout");
                navigate("/login");
                return;
              }

              navigate("/payment", { state: { total } });
            }}
            className="bg-green-600 text-white w-full mt-4 py-2 rounded"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;