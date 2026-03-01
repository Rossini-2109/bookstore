import BookCard from "../components/BookCard";

const Toys = () => {
  const toys = [
    {
      id: 1,
      title: "Lego Set",
      author: "Creative Toys",
      price: 999,
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
    },
    {
      id: 2,
      title: "Puzzle Game",
      author: "Fun Games",
      price: 499,
      image: "https://tse2.mm.bing.net/th/id/OIP.CsrWzB0UViKHfcvrjVIWxAHaEo?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 3,
      title: "Remote Car",
      author: "Speed Toys",
      price: 1299,
      image: "https://m.media-amazon.com/images/I/71f-5MNQxLL._AC_.jpg",
    },
  ];

  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Toys Collection
      </h1>

      <div className="flex flex-wrap gap-8 justify-center">
        {toys.map((toy) => (
          <BookCard key={toy.id} item={toy} />
        ))}
      </div>
    </div>
  );
};

export default Toys;