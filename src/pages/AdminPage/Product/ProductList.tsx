import { useEffect, useState } from "react";
import BookForm from "./ProductForm";
import { FaTimes, FaEdit, FaTrash, FaSearch, FaSort } from "react-icons/fa";
import { getBooks, createBook, updateBook, deleteBook, getCategories } from "../../../api/book.service";
import { Book, Category } from "../../../../interfaces";

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
      setFilteredBooks(fetchedBooks);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Không thể tải danh sách sách. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  useEffect(() => {
    const results = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  const handleSort = (option: string) => {
    const sortedBooks = [...filteredBooks];
    switch (option) {
      case "price_asc":
        sortedBooks.sort((a, b) => (a.list_price || 0) - (b.list_price || 0));
        break;
      case "price_desc":
        sortedBooks.sort((a, b) => (b.list_price || 0) - (a.list_price || 0));
        break;
      case "name_asc":
        sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sortedBooks.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedBooks.sort((a, b) => a.id.localeCompare(b.id));
    }
    setFilteredBooks(sortedBooks);
    setSortOption(option);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      try {
        await deleteBook(id);
        await fetchBooks();
      } catch (err) {
        console.error("Failed to delete book:", err);
        setError("Không thể xóa sách. Vui lòng thử lại.");
      }
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleAddOrUpdateBook = async (bookData: Book | Omit<Book, "id">) => {
    try {
      if ("id" in bookData && bookData.id) {
        await updateBook(bookData.id, bookData);
      } else {
        await createBook(bookData);
      }
      setIsModalOpen(false);
      await fetchBooks();
    } catch (err) {
      console.error("Failed to save book:", err);
      setError("Không thể lưu sách. Vui lòng thử lại.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center bg-gray-900 text-white min-h-screen">
        <div className="text-xl">Đang tải danh sách sách...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex flex-col items-center justify-center bg-gray-900 text-white min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={fetchBooks}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">📚 Quản lý Sách</h2>

      {/* Search & Sort */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <div className="flex items-center bg-gray-800 p-2 rounded-md w-64">
            <FaSearch className="text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Tìm kiếm sách..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none px-2 text-white w-full"
            />
          </div>

          <div className="flex items-center bg-gray-800 p-2 rounded-lg relative w-48 shadow-md">
            <FaSort className="text-gray-400 ml-2" />
            <select
              title="sorting"
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
              className="bg-transparent text-white outline-none px-2 w-full cursor-pointer appearance-none"
            >
              <option value="">🔽 Sắp xếp...</option>
              <option value="price_asc">💰 Giá thấp đến cao</option>
              <option value="price_desc">💰 Giá cao đến thấp</option>
              <option value="name_asc">📖 Tên A-Z</option>
              <option value="name_desc">📖 Tên Z-A</option>
            </select>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md"
          onClick={() => {
            setIsModalOpen(true);
            setEditingBook(null);
          }}
        >
          + Thêm Sách
        </button>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes size={25} />
            </button>
            <BookForm
              onAddBook={handleAddOrUpdateBook}
              initialBook={editingBook}
              onCancel={() => setIsModalOpen(false)}
              categoryOptions={categories}
            />
          </div>
        </div>
      )}

      {/* Book Table */}
      <div className="flex-1 mt-6 overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr className="text-center">
              <th className="px-4 py-3">Tên Sách</th>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Thể Loại</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Tác Giả</th>
              <th className="px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 text-gray-200">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="text-center border-b border-gray-700">
                <td className="px-4 py-3">{book.name}</td>
                <td className="px-4 py-3">
                  <img
                    src={book.images?.[0]?.large_url || "https://via.placeholder.com/100"}
                    alt={book.name}
                    className="w-16 h-24 object-cover rounded-md shadow-md mx-auto"
                  />
                </td>
                <td className="px-4 py-3">
                  {book.categories?.name || "Không xác định"}
                </td>
                <td className="px-4 py-3">
                  {book.current_seller?.price
                    ? `${book.current_seller.price.toLocaleString()} đ`
                    : "N/A"}
                </td>
                <td className="px-4 py-3">
                  {Array.isArray(book.authors)
                    ? book.authors.map((author) => author.name).join(", ")
                    : "Không rõ"}
                </td>
                <td className="px-4 py-3 flex justify-center items-center gap-3">
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-all flex items-center gap-2 shadow-md"
                  >
                    <FaEdit /> Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center gap-2 shadow-md"
                  >
                    <FaTrash /> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
