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
      .then((data) => setBooks(data.books || []))
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleAddBook = () => {
    setBooks([...books, newBook]);
    setNewBook({
      id: "",
      name: "",
      original_price: undefined,
      authors: [{ name: "" }],
      quantity_sold: { value: 0 },
      categories: { name: "" },
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 flex flex-col h-[calc(100vh-20px)]">
  <h2 className="text-xl font-bold mb-4">Quản lý Sách</h2>
  <div className="mb-4 flex gap-2">
    <button
      className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
      onClick={() => setIsModalOpen(true)}
    >
      Thêm Sách
    </button>
  </div>
  
  {/* Chỉnh chiều cao và cuộn cho bảng */}
  <div className="flex-1 min-h-0 overflow-y-auto">
    <table className="w-full border-collapse border border-gray-300">
      <thead className="sticky top-0 bg-gray-200 z-10">
        <tr>
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Tên Sách</th>
          <th className="border border-gray-300 px-4 py-2">Ảnh</th>
          <th className="border border-gray-300 px-4 py-2">Thể Loại</th>
          <th className="border border-gray-300 px-4 py-2">Giá</th>
          <th className="border border-gray-300 px-4 py-2">Tác Giả</th>
          <th className="border border-gray-300 px-4 py-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className="text-center border border-gray-300">
            <td className="border border-gray-300 px-4 py-2">{book.id}</td>
            <td className="border border-gray-300 px-4 py-2">{book.name}</td>
            <td className="border border-gray-300 px-4 py-2">
              <img
                src={book.images?.[0]?.small_url || "https://via.placeholder.com/100"}
                alt={book.name}
                className="w-16 h-24 object-cover rounded"
              />
            </td>
            <td className="border border-gray-300 px-4 py-2">{book.categories?.name || "Không xác định"}</td>
            <td className="border border-gray-300 px-4 py-2">{book.original_price ? `${book.original_price} $` : "N/A"}</td>
            <td className="border border-gray-300 px-4 py-2">{book.authors?.map(author => author.name).join(", ") || "Không rõ"}</td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(book.id)}
              >
                Xóa
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
