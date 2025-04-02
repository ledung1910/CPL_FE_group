import { useState } from "react";

const BookForm = ({ addBook }) => {
  const [book, setBook] = useState({
    id: "",
    name: "",
    category: "",
    original_price: "",
    author: "",
    quantity_sold: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.id || !book.name) {
      alert("Vui lòng nhập ID và tên sách!");
      return;
    }
    addBook(book);
    setBook({ id: "", name: "", category: "", original_price: "", author: "", quantity_sold: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-lg font-semibold">Thêm Sách Mới</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <input type="text" name="id" placeholder="ID" value={book.id} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="name" placeholder="Tên Sách" value={book.name} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="category" placeholder="Thể Loại" value={book.category} onChange={handleChange} className="p-2 border rounded" />
        <input type="number" name="original_price" placeholder="Giá" value={book.original_price} onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="author" placeholder="Tác Giả" value={book.author} onChange={handleChange} className="p-2 border rounded" />
        <input type="number" name="quantity_sold" placeholder="Số lượng bán" value={book.quantity_sold} onChange={handleChange} className="p-2 border rounded" />
      </div>
      <button type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">Thêm Sách</button>
    </form>
  );
};

export default BookForm;
