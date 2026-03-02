import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import jsPDF from "jspdf";
import { CartContext } from "../context/CartContext";
import { FaLock, FaCreditCard, FaMobileAlt, FaCheckCircle, FaChevronLeft } from "react-icons/fa";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

  const totalAmount = location.state?.total || 0;
  const [method, setMethod] = useState("upi");
  const [showSuccess, setShowSuccess] = useState(false);

  // Form States
  const [cardData, setCardData] = useState({ number: "", expiry: "", cvc: "" });
  const [upiId, setUpiId] = useState("");

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
    const userEmail = localStorage.getItem("userEmail") || "Guest User";
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

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    generateInvoice(newOrder);
    setCart([]);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/orders");
    }, 3000);
  };

  const generateInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("BOOK STORE - INVOICE", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id}`, 20, 30);
    doc.text(`Date: ${order.orderDate}`, 20, 35);
    doc.line(20, 40, 190, 40);
    let y = 50;
    order.items.forEach((item) => {
      doc.text(`${item.title} (x${item.quantity || 1})`, 20, y);
      doc.text(`Rs. ${item.price}`, 160, y);
      y += 10;
    });
    doc.line(20, y, 190, y);
    doc.text(`Total Paid: Rs. ${order.total.toFixed(2)}`, 140, y + 10);
    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-6 mb-10">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-amber-600 transition-all">
            <FaChevronLeft size={10} /> Back to Cart
          </button>
          <div className="flex items-center gap-2 text-slate-400">
            <FaLock size={12} />
            <span className="text-xs font-black uppercase tracking-widest">Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-5 gap-12">
        
        {/* --- Left: Payment Selection (3 Cols) --- */}
        <div className="md:col-span-3 space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Choose Payment Method</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMethod("upi")}
              className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                method === "upi" ? "border-amber-500 bg-amber-50 shadow-lg shadow-amber-100" : "border-slate-200 bg-white"
              }`}
            >
              <FaMobileAlt size={24} className={method === "upi" ? "text-amber-600" : "text-slate-400"} />
              <span className="font-black text-sm uppercase">UPI / PhonePe</span>
            </button>

            <button
              onClick={() => setMethod("card")}
              className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${
                method === "card" ? "border-amber-500 bg-amber-50 shadow-lg shadow-amber-100" : "border-slate-200 bg-white"
              }`}
            >
              <FaCreditCard size={24} className={method === "card" ? "text-amber-600" : "text-slate-400"} />
              <span className="font-black text-sm uppercase">Debit / Credit Card</span>
            </button>
          </div>

          {/* Dynamic Forms */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            {method === "upi" ? (
              <div className="space-y-4">
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Your VPA / UPI ID</label>
                <input 
                  type="text" 
                  placeholder="username@okaxis" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-amber-500 font-bold"
                />
                <p className="text-[10px] text-slate-400 font-bold">A request will be sent to your mobile app.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Card Number</label>
                  <input 
                    type="text" 
                    placeholder="xxxx xxxx xxxx xxxx" 
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-amber-500 font-bold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-amber-500 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">CVC</label>
                    <input type="password" placeholder="***" className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-amber-500 font-bold" />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={handlePayment}
            className="w-full bg-amber-600 text-white font-black py-5 rounded-2xl hover:bg-amber-500 hover:text-slate-900 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95"
          >
            Confirm & Pay Rs. {totalAmount.toFixed(2)}
          </button>
        </div>

        {/* --- Right: Order Summary (2 Cols) --- */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-[1.5rem] border border-slate-200 sticky top-10">
            <h3 className="text-lg font-black text-slate-900 mb-6">Order Summary</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 scrollbar-hide">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.image} className="w-12 h-16 object-cover rounded-lg bg-slate-100" alt="" />
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-800 leading-tight">{item.title}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Qty: {item.quantity || 1}</p>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">₹{item.price}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-dashed border-slate-200 pt-6 space-y-3">
              <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                <span>Items Total</span>
                <span className="text-slate-900">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 uppercase tracking-widest pt-3 border-t border-slate-100">
                <span>Amount to Pay</span>
                <span className="text-xl text-amber-600 tracking-tighter italic">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Success Modal --- */}
      {showSuccess && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex justify-center items-center z-[100] p-6">
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-sm w-full transform animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle size={50} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2 italic">Success!</h2>
            <p className="text-slate-500 font-bold text-sm mb-6 leading-relaxed">
              Your order has been confirmed. Your invoice is downloading automatically.
            </p>
            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
               <div className="h-full bg-amber-500 animate-[progress_3s_linear]" style={{ width: '100%' }}></div>
            </div>
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Redirecting to My Orders...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;