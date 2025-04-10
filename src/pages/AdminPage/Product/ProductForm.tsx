import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Book, Category } from "../../../../interfaces";

interface Props {
  onAddBook: (bookData: Book | Omit<Book, "id">) => Promise<void>;
  initialBook: Book | null;
  onCancel: () => void;
  categoryOptions: Category[];
}

const initialBookDefault: Omit<Book, "id"> = {
  name: "",
  authors: [{ id: "", name: "" }],
  categories: { id: "", name: "" },
  current_seller: { price: 0, is_best_store: false },
  description: "",
  images: [],
  original_price: 0,
  specifications: [],
  list_price: 0,
  is_ship_now: false,
  is_freeship_extra: false,
  is_top_deal: false,
  rating_average: 0,
  quantity_sold: {text: "", value: 0},
};

const BookForm: React.FC<Props> = ({ onAddBook, initialBook, categoryOptions, onCancel }) => {
  const [book, setBook] = useState<Omit<Book, "id">>(initialBook || initialBookDefault);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "list_price" || name === "original_price" ? Number(value) : value,
    }));
  };

  const handleAuthorChange = (value: string) => {
    setBook((prev) => ({
      ...prev,
      authors: [{ id: "", name: value }],
    }));
  };

  const handleCategoryChange = (id: string) => {
    const selected = categoryOptions.find((cat) => cat.id.toString() === id);
    if (selected) {
      setBook((prev) => ({
        ...prev,
        categories: { id: selected.id, name: selected.name },
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setBook((prev) => ({
          ...prev,
          images: [{ id: "", large_url: url }],
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullBook = initialBook ? { ...book, id: initialBook.id } : book;
    onAddBook(fullBook as Book);
    if (!initialBook) setBook(initialBookDefault);
  };

  return (
    <div className="overflow-y-auto max-h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-col space-y-6">
          <h3 className="text-lg font-semibold">{initialBook ? "Edit Book" : "Add Book"}</h3>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              title="Name"
              name="name"
              value={book.name}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-700 p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Author</label>
            <input
              title="Author"
              value={book.authors && book.authors[0]?.name || ""}
              onChange={(e) => handleAuthorChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Original Price</label>
            <input
              title="Original Price"
              type="number"
              name="original_price"
              value={book.original_price}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-700 p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Price</label>
            <input
              title="Price"
              type="number"
              value={book.current_seller.price}
              onChange={(e) =>
                setBook((prev) => ({
                  ...prev,
                  current_seller: {
                    ...prev.current_seller,
                    price: Number(e.target.value),
                  },
                }))
              }
              className="bg-gray-800 border border-gray-700 p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Category</label>
            <select
              title="Category"
              value={book.categories?.id?.toString() || ""}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-gray-800 border border-gray-700 p-2 rounded"
              required
            >
              <option value="">Select category</option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="bestStore"
              checked={book.current_seller.is_best_store}
              onChange={(e) =>
                setBook((prev) => ({
                  ...prev,
                  current_seller: {
                    ...prev.current_seller,
                    is_best_store: e.target.checked,
                  },
                }))
              }
              className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="bestStore" className="text-sm font-medium">
              Best Store?
            </label>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Description</label>
            <textarea
              title="Description"
              name="description"
              value={book.description}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-700 p-2 rounded h-28"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Upload Image</label>
            <div className="flex flex-col items-start">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-600"
              >
                <FaUpload /> Choose Image
              </label>
              {book.images?.[0]?.large_url && (
                <img
                  src={book.images[0].large_url}
                  alt="Preview"
                  className="mt-3 w-32 h-32 object-cover rounded-lg border border-gray-700"
                />
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">Specifications</label>
            <div className="space-y-4">
              {book.specifications.map((spec, specIndex) => (
                <div key={specIndex} className="border border-gray-700 p-4 rounded bg-gray-800 space-y-4">
                  <input
                    value={spec.name}
                    onChange={(e) => {
                      const updated = [...book.specifications];
                      updated[specIndex].name = e.target.value;
                      setBook({ ...book, specifications: updated });
                    }}
                    placeholder="Specification Group Name"
                    className="w-full bg-gray-700 p-2 rounded"
                  />
                  {spec.attributes.map((attr, attrIndex) => (
                    <div key={attrIndex} className="flex flex-col gap-2">
                      <input
                        value={attr.name}
                        onChange={(e) => {
                          const updated = [...book.specifications];
                          updated[specIndex].attributes[attrIndex].name = e.target.value;
                          setBook({ ...book, specifications: updated });
                        }}
                        placeholder="Attribute Name"
                        className="bg-gray-700 p-2 rounded"
                      />
                      <input
                        value={attr.value}
                        onChange={(e) => {
                          const updated = [...book.specifications];
                          updated[specIndex].attributes[attrIndex].value = e.target.value;
                          setBook({ ...book, specifications: updated });
                        }}
                        placeholder="Attribute Value"
                        className="bg-gray-700 p-2 rounded"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...book.specifications];
                      updated[specIndex].attributes.push({ name: "", value: "" });
                      setBook({ ...book, specifications: updated });
                    }}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    + Add Attribute
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setBook({
                    ...book,
                    specifications: [...book.specifications, { name: "", attributes: [] }]
                  });
                }}
                className="text-sm text-blue-400 hover:underline"
              >
                + Add Specification Group
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded flex items-center justify-center gap-2"
            >
            {initialBook ? "Update Book" : "Add Book"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookForm;