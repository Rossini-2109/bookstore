import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { FaLayerGroup, FaSearch } from "react-icons/fa";

const Books = ({ search }) => {
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTku2_xOhytPlFZnE467G3CJQUyFZ5C8Sx8BA&s",
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
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      price: 499,
      rating: 5,
      stock: 10,
      description: "Powerful lessons in personal change and effectiveness.",
      reviews: "4.7/5 based on 85000+ reviews",
      image: "https://m.media-amazon.com/images/I/71UwSHSZRnS._SL1500_.jpg"
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
      image: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",
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
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyaQo9bwT5MWWWnN5ZTG_NdUve06F4Y25lOw&s",
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
      image: "data:image/jpeg;base64,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",
    },
  ];

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Page Header */}
      <div className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-amber-600 mb-4">
              <FaLayerGroup size={18} />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Full Archive</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
              Explore the <span className="text-amber-500 italic underline decoration-amber-200 underline-offset-8">Library</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-lg">
              {search 
                ? `Showing results for "${search}"` 
                : "Browse our hand-picked collection of masterpieces across all genres."}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-6">
          <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
            {filteredBooks.length} Books Found
          </span>
          <div className="flex gap-4">
            {/* You could add sorting dropdowns here later */}
            <span className="text-slate-900 font-black text-sm">Sort: Featured</span>
          </div>
        </div>

        {filteredBooks.length > 0 ? (
          /* 👇 THE PERFECT 4 COLUMN GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => navigate(`/book/${book.id}`, { state: book })}
                className="transform transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <BookCard item={book} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Design */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-50 p-8 rounded-[3rem] mb-6">
              <FaSearch className="text-slate-200" size={50} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">No masterpieces found</h3>
            <p className="text-slate-500">Try searching for a different title or author.</p>
          </div>
        )}
      </div>

      {/* Subtle Footer Accent */}
      <div className="py-20 bg-slate-900 text-center">
        <h4 className="text-white font-black text-xl mb-2">Can't find what you're looking for?</h4>
        <p className="text-slate-400 mb-8">Request a book and we'll source it for you.</p>
        <button className="px-8 py-3 bg-amber-500 text-slate-950 font-black rounded-2xl hover:bg-amber-400 transition-all">
          Request a Title
        </button>
      </div>
    </div>
  );
};

export default Books;