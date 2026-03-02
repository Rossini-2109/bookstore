import { useLocation, useNavigate } from "react-router-dom";
import { FaRegStar, FaPlus, FaMinus } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state;
  const { cart, addToCart, updateQuantity, removeFromCart } =
    useContext(CartContext);

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");

  // Check if item is in cart and get its quantity
  const cartItem = cart.find((cartItem) => cartItem.id === book?.id);
  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    if (book) {
      const storedReviews =
        JSON.parse(localStorage.getItem(`reviews-${book.id}`)) || [];
      setReviews(storedReviews);
    }
  }, [book]);

  if (!book) {
    return (
      <div className="p-10">
        <h2>Book not found</h2>
      </div>
    );
  }

  const addReview = () => {
    if (!comment.trim()) return;

    const newReviews = [...reviews, comment];
    setReviews(newReviews);

    localStorage.setItem(`reviews-${book.id}`, JSON.stringify(newReviews));

    setComment("");
  };

  // MOCK RELATED BOOKS (same author logic)
  const allBooks = JSON.parse(localStorage.getItem("allBooks")) || [];
  const relatedBooks = allBooks.filter(
    (b) => b.author === book.author && b.id !== book.id,
  );

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-300 px-4 py-2 rounded"
      >
        ← Back
      </button>

      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-10">
        <img
          src={book.image}
          alt={book.title}
          className="h-80 object-cover rounded"
        />

        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-gray-600 mt-2">by {book.author}</p>

          {/* Rating */}
          <div className="flex text-yellow-400 mt-3">
            {[...Array(book.rating || 4)].map((_, i) => (
              <FaRegStar key={i} />
            ))}
          </div>

          <p className="text-xl font-semibold text-yellow-600 mt-4">
            ₹{book.price}
          </p>

          <p className="mt-4 text-gray-700">{book.description}</p>

          {/* Cart Controls */}
          {quantity > 0 ? (
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center bg-green-50 border border-green-200 rounded-lg p-1">
                <button
                  onClick={() => updateQuantity(book.id, quantity - 1)}
                  className="p-2 rounded hover:bg-green-200 transition-colors"
                >
                  <FaMinus size={14} className="text-green-600" />
                </button>
                <span className="font-bold text-green-800 px-4 py-2">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(book.id, quantity + 1)}
                  className="p-2 rounded hover:bg-green-200 transition-colors"
                >
                  <FaPlus size={14} className="text-green-600" />
                </button>
              </div>
              <span className="text-sm text-gray-600">In Cart</span>
            </div>
          ) : (
            <button
              onClick={() => addToCart(book)}
              className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white mt-10 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Write a review..."
        />

        <button
          onClick={addReview}
          className="bg-green-600 text-white px-4 py-2 rounded mt-3"
        >
          Submit Review
        </button>

        <div className="mt-6 space-y-2">
          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet</p>
          )}

          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-100 p-3 rounded">
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Related Books</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBooks.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded shadow cursor-pointer"
                onClick={() => navigate("/book-details", { state: item })}
              >
                <img
                  src={item.image}
                  className="h-32 w-full object-cover rounded"
                  alt={item.title}
                />
                <p className="text-sm mt-2 font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
