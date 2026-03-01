import BookCard from "../components/BookCard";

const Stationery = () => {
  const items = [
    {
      id: 1,
      title: "Notebook",
      author: "Classmate",
      price: 99,
      image: "https://cf.shopee.co.id/file/c99cde92ed5b9d24fc46b99fb3f2ee1e",
    },
    {
      id: 2,
      title: "Pen Pack",
      author: "Reynolds",
      price: 149,
      image: "https://m.media-amazon.com/images/I/71UByhQxlAL.jpg",
    },
    {
      id: 3,
      title: "Planner",
      author: "Daily Organiser",
      price: 299,
      image: "https://tse2.mm.bing.net/th/id/OIP.7kzCh10mJ8R9aHp7r3fzVAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 4,
      title: "Highlighter Set",
      author: "Camlin",
      price: 199,
      image: "https://m.media-amazon.com/images/I/71B4n2PqSBL.jpg",
    },
    {
      id: 5,
      title: "Sticky Notes",
      author: "Post-it",
      price: 129,
      image: "https://m.media-amazon.com/images/I/71wz9hM8W-L.jpg",
    },
    {
      id: 6,
      title: "Pencil Box",
      author: "Cello",
      price: 249,
      image: "https://m.media-amazon.com/images/I/61K8Z3h7jNL.jpg",
    },
    {
      id: 7,
      title: "Sketch Pens",
      author: "Faber-Castell",
      price: 199,
      image: "https://m.media-amazon.com/images/I/81f3q9f8XJL.jpg",
    },
    {
      id: 8,
      title: "Drawing Book",
      author: "Navneet",
      price: 159,
      image: "https://m.media-amazon.com/images/I/71n1xUOZz-L.jpg",
    },
    {
      id: 9,
      title: "Eraser Pack",
      author: "Apsara",
      price: 59,
      image: "https://m.media-amazon.com/images/I/61z8M2ZxO0L.jpg",
    },
    {
      id: 10,
      title: "Sharpener",
      author: "Nataraj",
      price: 49,
      image: "https://m.media-amazon.com/images/I/61QkK0G0Q2L.jpg",
    },
    {
      id: 11,
      title: "Calculator",
      author: "Casio",
      price: 799,
      image: "https://m.media-amazon.com/images/I/71v0xPz9w-L.jpg",
    },
    {
      id: 12,
      title: "File Folder",
      author: "Solo",
      price: 179,
      image: "https://m.media-amazon.com/images/I/71vE7ZK6kTL.jpg",
    },
    {
      id: 13,
      title: "Stapler",
      author: "Kangaro",
      price: 299,
      image: "https://m.media-amazon.com/images/I/61n9wq2JZ1L.jpg",
    },
    {
      id: 14,
      title: "Glue Stick",
      author: "Fevistik",
      price: 89,
      image: "https://m.media-amazon.com/images/I/61T3H8X9mXL.jpg",
    },
    {
      id: 15,
      title: "Ruler Scale",
      author: "Camlin",
      price: 39,
      image: "https://m.media-amazon.com/images/I/61nq7V7zNHL.jpg",
    },
    {
      id: 16,
      title: "Whiteboard Marker",
      author: "Luxor",
      price: 149,
      image: "https://m.media-amazon.com/images/I/61a7X4tqQXL.jpg",
    },
  ];

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Stationery Collection
      </h1>

      {/* 👇 4 ITEMS PER ROW */}
      <div className="grid grid-cols-4 gap-8 place-items-center">
        {items.map((item) => (
          <BookCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Stationery;