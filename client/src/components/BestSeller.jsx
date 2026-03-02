import { useEffect } from "react";
import BookCard from "./BookCard";

const BestSeller = () => {
  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      price: 499,
      discount: 20,
      rating: 5,
      stock: 10,
      image: "https://m.media-amazon.com/images/I/81ANaVZk5LL.jpg",
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      price: 399,
      rating: 4,
      stock: 5,
      image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
    },
    {
      id: 3,
      title: "The Alchemist",
      price: 299,
      rating: 4,
      stock: 0,
      image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    },
    {
      id: 4,
      title: "Harry Potter",
      price: 599,
      rating: 5,
      stock: 8,
      image: "https://m.media-amazon.com/images/I/81iqZ2HHD-L.jpg",
    },
  ];

  // Auto scroll
  useEffect(() => {
    const container = document.getElementById("scrollContainer");
    const interval = setInterval(() => {
      if (container) {
        container.scrollLeft += 300;
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>

      <div
        id="scrollContainer"
        className="flex overflow-x-auto space-x-6 scroll-smooth"
      >
        {books.map((book) => (
          <BookCard key={book.id} item={book} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
