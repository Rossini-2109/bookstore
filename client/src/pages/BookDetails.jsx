import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const BookDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state;
  const { addToCart } = useContext(CartContext);

  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");

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

    localStorage.setItem(
      `reviews-${book.id}`,
      JSON.stringify(newReviews)
    );

    setComment("");
  };

  // MOCK RELATED BOOKS (same author logic)
  const allBooks = JSON.parse(localStorage.getItem("allBooks")) || [];
  const relatedBooks = allBooks.filter(
    (b) => b.author === book.author && b.id !== book.id
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
              <FaStar key={i} />
            ))}
          </div>

          <p className="text-xl font-semibold text-yellow-600 mt-4">
            ₹{book.price}
          </p>

          <p className="mt-4 text-gray-700">
            {book.description}
          </p>

          <button
            onClick={() => addToCart(book)}
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
          >
            Add to Cart
          </button>
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
          <h2 className="text-2xl font-bold mb-4">
            Related Books
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedBooks.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded shadow cursor-pointer"
                onClick={() =>
                  navigate("/book-details", { state: item })
                }
              >
                <img
                  src={item.image}
                  className="h-32 w-full object-cover rounded"
                  alt={item.title}
                />
                <p className="text-sm mt-2 font-medium">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;