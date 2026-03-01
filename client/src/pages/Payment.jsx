import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import jsPDF from "jspdf";
import { CartContext } from "../context/CartContext";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const totalAmount = location.state?.total || 0;

  const [method, setMethod] = useState("upi");
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔐 Protect Page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("redirectAfterLogin", "/payment");
      navigate("/login");
    }
  }, [navigate]);

  const handlePayment = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orderId = "ORD-" + Date.now();
    const userEmail = localStorage.getItem("userEmail");

    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 5);

    const newOrder = {
      id: orderId,
      user: userEmail,
      items: cart,
      total: totalAmount,
      status: "Processing",
      orderDate: new Date().toLocaleDateString(),
      deliveryDate: delivery.toLocaleDateString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, newOrder])
    );

    generateInvoice(newOrder);

    setCart([]);

    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/orders");
    }, 2500);
  };

  const generateInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("PageTurn Bookstore", 20, 20);

    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 20, 35);
    doc.text(`Order Date: ${order.orderDate}`, 20, 45);
    doc.text(`Delivery Date: ${order.deliveryDate}`, 20, 55);

    doc.line(20, 60, 190, 60);

    let y = 70;

    order.items.forEach((item) => {
      doc.text(item.title, 20, y);
      doc.text("Rs. " + item.price, 160, y);
      y += 10;
    });

    doc.line(20, y, 190, y);
    doc.text("Total: Rs. " + order.total, 140, y + 10);

    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <div className="p-10 min-h-screen bg-gray-100 relative">
      <h1 className="text-3xl font-bold text-center mb-8">
        Payment Page
      </h1>

      <div className="bg-white p-8 max-w-xl mx-auto rounded shadow">
        <p className="text-lg font-semibold mb-4">
          Total Amount: Rs. {totalAmount.toFixed(2)}
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMethod("upi")}
            className={`px-4 py-2 rounded ${
              method === "upi"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            UPI
          </button>

          <button
            onClick={() => setMethod("card")}
            className={`px-4 py-2 rounded ${
              method === "card"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Card
          </button>
        </div>

        <button
          onClick={handlePayment}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Pay Now
        </button>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful ✅
            </h2>
            <p>Your order has been placed successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;