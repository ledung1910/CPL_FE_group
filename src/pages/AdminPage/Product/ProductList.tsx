import { useEffect, useState } from "react";
import BookForm from "./ProductAdd";
import { FaTimes, FaEdit, FaTrash, FaSearch, FaSort } from "react-icons/fa";

interface Book {
  id: string;
  name: string;
  images?: { small_url: string }[];
  original_price?: number;
  authors?: { name: string }[];
  categories?: { name: string };
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("/api.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books || []);
        setFilteredBooks(data.books || []);
      })
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  // Xử lý tìm kiếm
  useEffect(() => {
    const results = books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [searchTerm, books]);

  // Xử lý sắp xếp
  const handleSort = (option: string) => {
    let sortedBooks = [...books];
  
    switch (option) {
      case "price_asc":
        sortedBooks.sort((a, b) => (a.original_price || 0) - (b.original_price || 0));
        break;
      case "price_desc":
        sortedBooks.sort((a, b) => (b.original_price || 0) - (a.original_price || 0));
        break;
      case "name_asc":
        sortedBooks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sortedBooks.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sortedBooks.sort((a, b) => parseInt(a.id) - parseInt(b.id)); // Sắp xếp theo ID mặc định
    }
  
    setBooks(sortedBooks);
    setSortOption(option);
  };
  

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 flex flex-col bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">📚 Quản lý Sách</h2>

      <div className="flex justify-between items-center mb-6">
  {/* Thanh tìm kiếm và sắp xếp - Bên trái */}
  <div className="flex gap-3 items-center">
    {/* Ô tìm kiếm */}
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

    {/* Chọn sắp xếp */}
    <div className="flex items-center bg-gray-800 p-2 rounded-lg relative w-48 shadow-md">
      <FaSort className="text-gray-400 ml-2" />
      <select
        value={sortOption}
        onChange={(e) => handleSort(e.target.value)}
        className="bg-transparent text-white outline-none px-2 w-full cursor-pointer appearance-none"
      >
        <option value="" className="bg-gray-900 text-gray-300 py-2">🔽 Sắp xếp...</option>
        <option value="price_asc" className="bg-gray-900 text-gray-300 py-2">💰 Giá thấp đến cao</option>
        <option value="price_desc" className="bg-gray-900 text-gray-300 py-2">💰 Giá cao đến thấp</option>
        <option value="name_asc" className="bg-gray-900 text-gray-300 py-2">📖 Tên A-Z</option>
        <option value="name_desc" className="bg-gray-900 text-gray-300 py-2">📖 Tên Z-A</option>
      </select>
    </div>


  </div>

  {/* Nút mở modal - Bên phải */}
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

      {/* Modal thêm/sửa sách */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="w-full">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes size={25} />
            </button>
            <BookForm onAddBook={(book) => console.log(book)} initialBook={editingBook} />
          </div>
        </div>
      )}

      {/* Bảng danh sách sách */}
      <div className="flex-1 mt-6 overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
            <tr className="text-center">
              <th className="px-4 py-3">ID</th>
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
                <td className="px-4 py-3">{book.id}</td>
                <td className="px-4 py-3">{book.name}</td>
                <td className="px-4 py-3">
                  <img
                    src={book.images?.[0]?.small_url || "https://via.placeholder.com/100"}
                    alt={book.name}
                    className="w-16 h-24 object-cover rounded-md shadow-md"
                  />
                </td>
                <td className="px-4 py-3">{book.categories?.name || "Không xác định"}</td>
                <td className="px-4 py-3">
                  {book.original_price ? `${book.original_price} $` : "N/A"}
                </td>
                <td className="px-4 py-3">
                  {book.authors?.map((author) => author.name).join(", ") || "Không rõ"}
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
