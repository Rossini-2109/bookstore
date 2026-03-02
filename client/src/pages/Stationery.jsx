import BookCard from "../components/BookCard";
import { FaPencilRuler, FaPenFancy, FaRegStickyNote } from "react-icons/fa";

const Stationery = () => {
  const items = [
    { id: 1, title: "Notebook", author: "Classmate", price: 99, image: "https://cf.shopee.co.id/file/c99cde92ed5b9d24fc46b99fb3f2ee1e" },
    { id: 2, title: "Pen Pack", author: "Reynolds", price: 149, image: "https://m.media-amazon.com/images/I/71UByhQxlAL.jpg" },
    { id: 3, title: "Planner", author: "Daily Organiser", price: 299, image: "https://tse2.mm.bing.net/th/id/OIP.7kzCh10mJ8R9aHp7r3fzVAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 4, title: "Highlighter Set", author: "Camlin", price: 199, image: "https://m.media-amazon.com/images/I/71B4n2PqSBL.jpg" },
    { id: 5, title: "Sticky Notes", author: "Post-it", price: 129, image: "https://rukminim2.flixcart.com/image/480/640/kz1lle80/post-it/x/y/b/sticky-notes-3x3-inches-post-it-note-pads-5-colours-500-sheets-original-imagb58f7p9hahrp.jpeg?q=90" },
    { id: 6, title: "Pencil Box", author: "Cello", price: 249, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjnGXriwF_IqJ2ya93jEfvLzkg_crBYpI2hQ&s" },
    { id: 7, title: "Sketch Pens", author: "Faber-Castell", price: 199, image: "https://m.media-amazon.com/images/I/81f3q9f8XJL.jpg" },
    { id: 8, title: "Drawing Book", author: "Navneet", price: 159, image: "https://m.media-amazon.com/images/I/71n1xUOZz-L.jpg" },
    { id: 9, title: "Eraser Pack", author: "Apsara", price: 59, image: "https://m.media-amazon.com/images/I/61z8M2ZxO0L.jpg" },
    { id: 10, title: "Sharpener", author: "Nataraj", price: 49, image: "https://m.media-amazon.com/images/I/61QkK0G0Q2L.jpg" },
    { id: 11, title: "Calculator", author: "Casio", price: 799, image: "https://m.media-amazon.com/images/I/71v0xPz9w-L.jpg" },
    { id: 12, title: "File Folder", author: "Solo", price: 179, image: "https://m.media-amazon.com/images/I/71vE7ZK6kTL.jpg" },
    { id: 13, title: "Stapler", author: "Kangaro", price: 299, image: "https://m.media-amazon.com/images/I/61n9wq2JZ1L.jpg" },
    { id: 14, title: "Glue Stick", author: "Fevistik", price: 89, image: "https://m.media-amazon.com/images/I/61T3H8X9mXL.jpg" },
    { id: 15, title: "Ruler Scale", author: "Camlin", price: 39, image: "https://m.media-amazon.com/images/I/61nq7V7zNHL.jpg" },
    { id: 16, title: "Whiteboard Marker", author: "Luxor", price: 149, image: "https://m.media-amazon.com/images/I/61a7X4tqQXL.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* --- Section Header --- */}
      <div className="bg-slate-50 border-b border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 text-amber-600 mb-4">
            <FaPencilRuler size={20} className="rotate-12" />
            <span className="text-xs font-black uppercase tracking-[0.4em]">Essential Tools</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6">
            Stationery <span className="text-amber-500 italic underline decoration-amber-200 underline-offset-8">Studio</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            From professional planners to artistic tools—elevate your workspace with our curated collection of high-quality essentials.
          </p>
        </div>
      </div>

      {/* --- Quick Navigation Bar --- */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center gap-8 overflow-x-auto no-scrollbar">
          {[
            { icon: <FaPenFancy />, label: "Writing" },
            { icon: <FaRegStickyNote />, label: "Organizers" },
            { icon: <FaPencilRuler />, label: "Art Supplies" }
          ].map((cat, i) => (
            <button key={i} className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-slate-400 hover:text-amber-600 transition-colors">
              <span className="text-amber-500">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* --- Top Metadata --- */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
             <span className="text-slate-900 font-black text-sm uppercase tracking-widest">
               {items.length} Products Available
             </span>
          </div>
          <div className="h-[1px] flex-1 bg-slate-100 mx-10 hidden lg:block" />
          <select className="bg-transparent text-sm font-bold text-slate-500 outline-none cursor-pointer hover:text-slate-900">
            <option>Featured First</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* --- Grid System --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {items.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative transition-all duration-500 group-hover:-translate-y-2">
                 {/* Reusing your BookCard with Stationery data */}
                 <BookCard item={item} />
              </div>
            </div>
          ))}
        </div>

        {/* --- Newsletter/Banner --- */}
        <div className="mt-32 rounded-[3rem] bg-slate-900 p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
           <h2 className="text-3xl font-black text-white mb-4 relative z-10">Bulk Orders for Offices?</h2>
           <p className="text-slate-400 mb-8 relative z-10">Get exclusive corporate discounts on premium stationery supplies.</p>
           <button className="px-10 py-4 bg-white text-slate-950 font-black rounded-2xl hover:bg-amber-500 transition-all relative z-10">
              Contact Sales
           </button>
        </div>
      </div>
    </div>
  );
};

export default Stationery;