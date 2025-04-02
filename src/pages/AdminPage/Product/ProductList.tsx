import { useEffect, useState } from "react";

interface Book {
  id: string;
  name: string;
  images?: { small_url: string }[];
  original_price?: number;
  authors?: { name: string }[];
  quantity_sold?: { value: number };
  categories?: { name: string };
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({
    id: "",
    name: "",
    original_price: undefined,
    authors: [{ name: "" }],
    quantity_sold: { value: 0 },
    categories: { name: "" },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data:", data);
        setBooks(data.books || []);
      })
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  const handleEdit = (id: string) => {
    alert(`Chỉnh sửa sách có ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sách này?");
    if (confirmDelete) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleAddBook = () => {
    setBooks([...books, newBook]);
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewBook((prevBook) => ({
      ...prevBook,
      categories: { name: e.target.value },
    }));
  };

  return (
    <section className="relative">
      <h1 className="text-3xl">Book List</h1>

      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded"
      >
        Thêm Mới Sách
      </button>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Image</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Category</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Original Price</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantity Sold</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-2">{book.id}</td>
                  <td className="px-4 py-2">{book.name}</td>
                  <td className="px-4 py-2">
                    <img
                      src={book.images?.[0]?.small_url || "https://via.placeholder.com/100"}
                      alt={book.name}
                      className="w-16 h-24 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{book.categories?.name || "Unknown"}</td>
                  <td className="px-4 py-2">{book.original_price ? `${book.original_price} $` : "N/A"}</td>
                  <td className="px-4 py-2">{book.authors?.length ? book.authors.map(author => author.name).join(", ") : "Unknown"}</td>
                  <td className="px-4 py-2">{book.quantity_sold?.value ?? "N/A"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(book.id)}
                      className="mr-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new book */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h2 className="text-xl mb-4">Thêm Mới Sách</h2>
            <form>
              <div className="mb-2">
                <label className="block mb-1">Tên Sách</label>
                <input
                  type="text"
                  name="name"
                  value={newBook.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Giá</label>
                <input
                  type="number"
                  name="original_price"
                  value={newBook.original_price || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Tác Giả</label>
                <input
                  type="text"
                  name="authors[0].name"
                  value={newBook.authors?.[0]?.name || ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Thể Loại</label>
                <select
                  name="categories.name"
                  value={newBook.categories?.name || ""}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Science">Science</option>
                  <option value="Fantasy">Fantasy</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleAddBook}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Thêm Sách
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookList;
