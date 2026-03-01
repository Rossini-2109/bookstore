import { useEffect, useState } from "react";
import jsPDF from "jspdf";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    // ✅ Filter orders for current user only
    const userOrders = savedOrders
      .filter((order) => order.user === userEmail)
      .map((order) => ({
        ...order,
        items: order.items || [],
        status: order.status || "Processing",
      }));

    setOrders(userOrders);
  }, []);

  // 🎨 Status Badge
  const getStatusStyle = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-200 text-yellow-800";
      case "Shipped":
        return "bg-blue-200 text-blue-800";
      case "Out for Delivery":
        return "bg-purple-200 text-purple-800";
      case "Delivered":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      case "Return Requested":
        return "bg-orange-200 text-orange-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // 🧾 Download Invoice
  const downloadInvoice = (order) => {
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
      doc.text(item.title || "Item", 20, y);
      doc.text(`₹${item.price || 0}`, 160, y);
      y += 10;
    });

    doc.line(20, y, 190, y);
    doc.text(`Total: ₹${order.total || 0}`, 150, y + 10);

    doc.save(`Invoice_${order.id}.pdf`);
  };

  // ❌ Cancel Order (Preserve other users' orders)
  const cancelOrder = (id) => {
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedAllOrders = allOrders.map((order) =>
      order.id === id
        ? { ...order, status: "Cancelled" }
        : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedAllOrders)
    );

    setOrders(
      updatedAllOrders.filter(
        (order) =>
          order.user === localStorage.getItem("userEmail")
      )
    );
  };

  // 🔄 Request Return (Preserve other users)
  const requestReturn = (id) => {
    const allOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedAllOrders = allOrders.map((order) =>
      order.id === id
        ? { ...order, status: "Return Requested" }
        : order
    );

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedAllOrders)
    );

    setOrders(
      updatedAllOrders.filter(
        (order) =>
          order.user === localStorage.getItem("userEmail")
      )
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-6 mb-6"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">
                  Order ID: {order.id}
                </p>
                <p>Order Date: {order.orderDate}</p>
                <p>Delivery By: {order.deliveryDate}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <hr className="my-4" />

            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex justify-between py-2"
              >
                <p>{item.title}</p>
                <p>₹{item.price}</p>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>₹{order.total}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => downloadInvoice(order)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Download Invoice
              </button>

              {order.status !== "Cancelled" && (
                <button
                  onClick={() => cancelOrder(order.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel Order
                </button>
              )}

              {order.status === "Delivered" && (
                <button
                  onClick={() => requestReturn(order.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Request Return
                </button>
              )}
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Return eligible within 7 days of delivery.
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;