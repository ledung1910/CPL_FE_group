import { useEffect, useState } from "react";

interface Book {
  id: string;
  name: string;
  images?: { small_url: string }[];
  original_price?: number;
  authors?: { name: string }[];
  quantity_sold?: { value: number };
  categories?: { name: string }; // Thêm categories
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Data:", data);
        setBooks(data.books || []);
      })
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  console.log("Books state:", books);

  const handleEdit = (id: string) => {
    // Hàm xử lý chỉnh sửa
    alert(`Chỉnh sửa sách có ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Hàm xử lý xóa
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sách này?");
    if (confirmDelete) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  return (
    <section className="relative">
      <h1 className="text-3xl">Book List</h1>
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
               {/* Thêm cột thể loại */}
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
                    {/* Thêm nút Sửa và Xóa */}
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
    </section>
  );
};

export default BookList;
