import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

const Books = ({ search, addToCart }) => {
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: 499,
      rating: 5,
      stock: 10,
      description: "An easy and proven way to build good habits and break bad ones.",
      reviews: "4.8/5 based on 12000 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 299,
      rating: 4,
      stock: 8,
      description: "A magical story about following your dreams and listening to your heart.",
      reviews: "4.7/5 based on 9500 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 399,
      rating: 4,
      stock: 5,
      description: "Learn financial independence and smart investing strategies.",
      reviews: "4.6/5 based on 10000 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg",
    },
    {
      id: 4,
      title: "Harry Potter",
      author: "J.K. Rowling",
      price: 599,
      rating: 5,
      stock: 12,
      description: "A young wizard’s journey through magic and friendship.",
      reviews: "4.9/5 based on 20000 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    },
    {
      id: 5,
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      price: 349,
      rating: 4,
      stock: 6,
      description: "Timeless principles for achieving success and wealth.",
      reviews: "4.5/5 based on 8500 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71UypkUjStL.jpg",
    },
    {
      id: 6,
      title: "Ikigai",
      author: "Héctor García",
      price: 399,
      rating: 5,
      stock: 9,
      description: "Discover the Japanese secret to a long and happy life.",
      reviews: "4.7/5 based on 7800 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71tbalAHYCL.jpg",
    },
    {
      id: 7,
      title: "The Power of Now",
      author: "Eckhart Tolle",
      price: 320,
      rating: 4,
      stock: 7,
      description: "A guide to spiritual enlightenment.",
      reviews: "4.6/5 based on 6200 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71VZzZ6z1GL.jpg",
    },
    {
      id: 8,
      title: "Deep Work",
      author: "Cal Newport",
      price: 450,
      rating: 5,
      stock: 6,
      description: "Rules for focused success in a distracted world.",
      reviews: "4.7/5 based on 5400 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
    },
    {
      id: 9,
      title: "The Subtle Art of Not Giving a F*ck",
      author: "Mark Manson",
      price: 399,
      rating: 4,
      stock: 8,
      description: "A counterintuitive approach to living a good life.",
      reviews: "4.5/5 based on 11000 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
    },
    {
      id: 10,
      title: "Can't Hurt Me",
      author: "David Goggins",
      price: 499,
      rating: 5,
      stock: 6,
      description: "Master your mind and defy the odds.",
      reviews: "4.8/5 based on 7300 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/81gTRv2HXrL.jpg",
    },
    {
      id: 11,
      title: "The 5 AM Club",
      author: "Robin Sharma",
      price: 350,
      rating: 4,
      stock: 10,
      description: "Own your morning, elevate your life.",
      reviews: "4.4/5 based on 6800 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71zytzrg6lL.jpg",
    },
    {
      id: 12,
      title: "The Psychology of Money",
      author: "Morgan Housel",
      price: 380,
      rating: 5,
      stock: 9,
      description: "Timeless lessons on wealth and happiness.",
      reviews: "4.8/5 based on 9000 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
    },
    {
      id: 13,
      title: "Wings of Fire",
      author: "A.P.J Abdul Kalam",
      price: 299,
      rating: 5,
      stock: 11,
      description: "An autobiography of India's missile man.",
      reviews: "4.9/5 based on 15000 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/81drfTT9ZfL.jpg",
    },
    {
      id: 14,
      title: "Do Epic Shit",
      author: "Ankur Warikoo",
      price: 320,
      rating: 4,
      stock: 10,
      description: "A guide to success and self-growth.",
      reviews: "4.6/5 based on 5000 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/81wZELpZobL.jpg",
    },
    {
      id: 15,
      title: "The Monk Who Sold His Ferrari",
      author: "Robin Sharma",
      price: 340,
      rating: 4,
      stock: 7,
      description: "A fable about fulfilling your dreams.",
      reviews: "4.5/5 based on 8200 reviews",
      image: "https://images-na.ssl-images-amazon.com/images/I/71Xygne8kPL.jpg",
    },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Books Collection</h1>

      {/* 👇 PERFECT 4 COLUMN GRID */}
      <div className="grid grid-cols-4 gap-8 place-items-center">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => navigate(`/book/${book.id}`, { state: book })}
            className="cursor-pointer"
          >
            <BookCard item={book} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;