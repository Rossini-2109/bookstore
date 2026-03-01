import { useState, useEffect } from "react";

const Admin = () => {
  const [products, setProducts] = useState(
    JSON.parse(localStorage.getItem("allBooks")) || []
  );

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("allBooks", JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    const book = {
      ...newBook,
      id: Date.now(),
    };

    setProducts([...products, book]);
    setNewBook({ title: "", author: "", price: "", image: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Add Book</h2>

        <input
          placeholder="Title"
          value={newBook.title}
          onChange={(e) =>
            setNewBook({ ...newBook, title: e.target.value })
          }
          className="border p-2 mr-2 mb-2"
        />

        <input
          placeholder="Author"
          value={newBook.author}
          onChange={(e) =>
            setNewBook({ ...newBook, author: e.target.value })
          }
          className="border p-2 mr-2 mb-2"
        />

        <input
          placeholder="Price"
          value={newBook.price}
          onChange={(e) =>
            setNewBook({ ...newBook, price: e.target.value })
          }
          className="border p-2 mr-2 mb-2"
        />

        <input
          placeholder="Image URL"
          value={newBook.image}
          onChange={(e) =>
            setNewBook({ ...newBook, image: e.target.value })
          }
          className="border p-2 mr-2 mb-2"
        />

        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4">All Products</h2>

      <div className="space-y-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <span>{p.title}</span>
            <button
              onClick={() => deleteProduct(p.id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;