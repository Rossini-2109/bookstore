import { FaShoppingCart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const BookCard = ({ item, addToCart }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white rounded-xl shadow-md p-4 w-64 relative"
      >
        {/* Image Section */}
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="h-40 w-full object-cover rounded mb-3"
          />

          {/* Sale Badge */}
          {item.discount && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              SALE -{item.discount}%
            </span>
          )}

          {/* Out Of Stock Overlay */}
          {item.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white font-bold rounded">
              Out of Stock
            </div>
          )}
        </div>

        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.author || "Author"}</p>

        {/* Star Rating */}
        <div className="flex text-yellow-400 text-sm mt-1">
          {[...Array(item.rating || 4)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <p className="text-yellow-600 font-semibold mt-2">
          ₹{item.price}
        </p>

        <button
          disabled={item.stock === 0}
          onClick={() => addToCart(item)}
          className={`w-full mt-3 py-2 rounded flex items-center justify-center gap-2 ${
            item.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }`}
        >
          <FaShoppingCart />
          {item.stock === 0 ? "Unavailable" : "Add to Cart"}
        </button>

        <button
          onClick={() => setOpen(true)}
          className="text-blue-500 text-sm mt-2"
        >
          Quick View
        </button>
      </motion.div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="mt-2">Price: ₹{item.price}</p>
            <p className="mt-2 text-gray-600">
              Premium quality product available now.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;