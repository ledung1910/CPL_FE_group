import { useState } from "react";
import { FaPlus, FaUpload } from "react-icons/fa";

interface Book {
  id: string;
  name: string;
  original_price?: number;
  authors?: { name: string }[];
  categories?: { name: string };
  image?: string;
  publisher?: string;
  publication_date?: string;
  dimensions?: string;
  book_cover?: string;
  number_of_page?: number;
  short_description?: string;
  description?: string;
}


interface Props {
  onAddBook: (book: Book) => void;
  initialBook?: Book | null;
}

const BookForm: React.FC<Props> = ({ onAddBook, initialBook }) => {
  const [book, setBook] = useState<Book>({
    id: "",
    name: "",
    original_price: undefined,
    authors: [{ name: "" }],
    categories: { name: "" },
    image: "",
    publisher: "",
    publication_date: "",
    dimensions: "",
    book_cover: "",
    number_of_page: undefined,
    short_description:"",
    description:"",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "original_price" || name === "number_of_page" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setBook((prev) => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddBook(book);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
  <h3 className="text-lg font-semibold mb-4">Add Product</h3>

  {/* Chia thành 2 cột với grid */}
  <div className="grid grid-cols-2 gap-8">

    {/* Cột trái */}
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Name</label>
        <input type="text" name="name" value={book.name} onChange={handleChange}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Brand</label>
        <input type="text" name="authors" value={book.authors?.[0]?.name || ""}
          onChange={(e) => setBook({ ...book, authors: [{ name: e.target.value }] })}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Price</label>
        <input type="number" name="original_price" value={book.original_price || ""}
          onChange={handleChange}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Category</label>
        <select name="categories" value={book.categories?.name || ""}
          onChange={(e) => setBook({ ...book, categories: { name: e.target.value } })}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required>
          <option value="">Select category</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Công ty phát hành</label>
        <input type="text" name="publisher" value={book.publisher}
          onChange={handleChange}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Ngày xuất bản</label>
        <input type="date" name="publication_date" value={book.publication_date}
          onChange={handleChange}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>

    {/* Cột phải */}
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Short Description</label>
        <input name="short_description" value={book.short_description || ""}
          onChange={handleChange}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 h-20" />
      </div>

      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Description</label>
        <input name="description" value={book.description || ""}
          onChange={handleChange}
          className="flex-1 bg-gray-800 border border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 h-24" />
      </div>

      {/* Upload Image */}
      <div className="flex items-center gap-4">
        <label className="w-32 text-sm font-medium">Upload Image</label>
        <div className="flex flex-col items-center">
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageUpload" />
          <label htmlFor="imageUpload"
            className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-600">
            <FaUpload /> Choose Image
          </label>
          {book.image && <img src={book.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />}
        </div>
      </div>

      {/* Nút thêm mới dưới nút Upload Image */}
      <button type="submit"
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2">
        <FaPlus /> Add new product
      </button>
    </div>
  </div>
</form>



  );
};

export default BookForm;
