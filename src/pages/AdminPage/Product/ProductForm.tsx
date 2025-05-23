import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { Book, BookImage, Category } from "../../../../interfaces";
import { getCategory } from "../../../api/book.service";
import { uploadToCloudinary } from "../../../hooks/useImage";

interface Props {
  onAddBook: (bookData: Book | Omit<Book, "id">) => Promise<void>;
  initialBook: Book | null;
  onCancel: () => void;
}

const initialBookDefault: Omit<Book, "id"> = {
  name: "",
  authors: [{ id: "", name: "" }],
  categories: { id: 0, name: "" },
  current_seller: { price: 0, is_best_store: false },
  description: "",
  images: [],
  original_price: 0,
  specifications: [],
  is_ship_now: false,
  is_freeship_extra: false,
  is_top_deal: false,
  rating_average: 0,
  quantity_sold: { text: "", value: 0 },
};


const BookForm: React.FC<Props> = ({ onAddBook, initialBook, onCancel }) => {
  const [book, setBook] = useState<Omit<Book, "id">>(initialBook || initialBookDefault);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<BookImage[]>(book.images || []);

  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
    }
  }, [initialBook]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategory();
        setCategoryOptions(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadToCloudinary(file);
        const newImage: BookImage = {
          id: Date.now().toString(),
          large_url: url,
        };
        setImages([...images, newImage]);
      } catch (error) {
        console.error("Upload image failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const handleAddSpecification = () => {
    if (book.specifications.length === 0) {
      setBook((prev) => ({
        ...prev,
        specifications: [{ name: "Thông tin chung", attributes: [] }],
      }));
    }
  };
  const handleAttributeChange = (attrIndex: number, name: "name" | "value", value: string) => {
    setBook((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec) => ({
        ...spec,
        attributes: spec.attributes.map((attr, index) =>
          index === attrIndex ? { ...attr, [name]: value } : attr
        ),
      })),
    }));
  };
  const handleAddAttribute = () => {
    setBook((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec) => ({
        ...spec,
        attributes: [...spec.attributes, { name: "", value: "" }],
      })),
    }));
  };
  const handleRemoveAttribute = (attrIndex: number) => {
    setBook((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec) => ({
        ...spec,
        attributes: spec.attributes.filter((_, index) => index !== attrIndex),
      })),
    }));
  };
  const handleRemoveSpecificationGroup = () => {
    setBook((prev) => ({ ...prev, specifications: [] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullBook = {
      ...book,
      images,
    };
    if (initialBook) {
      await onAddBook({ ...fullBook, id: initialBook.id });
    } else {
      await onAddBook(fullBook);
      setBook(initialBookDefault);
      setImages([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center px-4 z-50">
      <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="max-h-[80vh] pr-2 space-y-6">
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
                value={book.authors?.[0]?.name || ""}
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
                name="original_price" min={0}
                value={book.original_price}
                onChange={(e) =>
                  setBook((prev) => ({
                    ...prev,
                    original_price: Number(e.target.value),
                  }))
                }
                className="bg-gray-800 border border-gray-700 p-2 rounded appearance-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Price</label>
              <input
                title="Price"
                type="number" min={0}
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
              <label className="text-sm font-medium mb-1">Rating Average</label>
              <input
                title="Rate"
                type="number" min={0} max={5}
                step="0.1"
                name="rating_average"
                value={book.rating_average}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 5) {
                    setBook((prev) => ({ ...prev, rating_average: value }));
                  }
                }}
                className="bg-gray-800 border border-gray-700 p-2 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Quantity Sold</label>
              <div className="flex gap-4">
                <input
                  title="Quantity Value"
                  type="number"
                  min={0}
                  value={book.quantity_sold.value}
                  onChange={(e) =>
                    setBook((prev) => ({
                      ...prev,
                      quantity_sold: {
                        ...prev.quantity_sold,
                        value: Number(e.target.value),
                      },
                    }))
                  }
                  placeholder="Value"
                  className="w-1/2 bg-gray-800 border border-gray-700 p-2 rounded"
                />
                <input
                  title="Quantity Text"
                  value={book.quantity_sold.text}
                  onChange={(e) =>
                    setBook((prev) => ({
                      ...prev,
                      quantity_sold: {
                        ...prev.quantity_sold,
                        text: e.target.value,
                      },
                    }))
                  }
                  placeholder="Text (e.g. 'đã bán 123')"
                  className="w-1/2 bg-gray-800 border border-gray-700 p-2 rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
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
                  className="w-4 h-4"
                />
                <label htmlFor="bestStore" className="text-sm">Best Store?</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isShipNow"
                  checked={book.is_ship_now}
                  onChange={(e) => setBook((prev) => ({ ...prev, is_ship_now: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="isShipNow" className="text-sm">Ship Now?</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFreeshipExtra"
                  checked={book.is_freeship_extra}
                  onChange={(e) => setBook((prev) => ({ ...prev, is_freeship_extra: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="isFreeshipExtra" className="text-sm">Free Ship Extra?</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isTopDeal"
                  checked={book.is_top_deal}
                  onChange={(e) => setBook((prev) => ({ ...prev, is_top_deal: e.target.checked }))}
                  className="w-4 h-4"
                />
                <label htmlFor="isTopDeal" className="text-sm">Top Deal?</label>
              </div>
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
                  <FaUpload /> Chọn ảnh
                </label>

                {uploading && <p className="text-sm text-yellow-500 mt-2">Đang tải ảnh...</p>}

                <div className="flex flex-wrap gap-4 mt-3">
                  {images.map((img, index) => (
                    img.large_url && (
                      <div key={index} className="relative w-24 h-24">
                        <img
                          src={img.large_url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg border border-gray-700"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700"
                          title="Remove Image"
                        >
                          ×
                        </button>
                      </div>
                    )
                  ))}
                </div>
                {images.length === 0 && (
                  <p className="text-red-500 text-sm mt-1">Vui lòng chọn ít nhất một ảnh.</p>
                )}
              </div>
            </div>
            {book.specifications.length === 0 && (
              <button
                type="button"
                onClick={handleAddSpecification}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                + Thêm Specification
              </button>
            )}
            {book.specifications.length > 0 && (
              <div>
                <label className="text-sm font-medium block mb-2">Specifications</label>
                {book.specifications.map((spec, specIndex) => (
                  <div key={specIndex} className="border p-4 rounded space-y-2 bg-gray-900 border-gray-700">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="Tên nhóm thông số"
                        value="Thông tin chung"
                        readOnly
                        className="bg-gray-800 border border-gray-700 p-2 rounded w-full cursor-not-allowed"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveSpecificationGroup}
                        className="ml-4 text-red-500 text-sm hover:underline"
                      >
                        Xóa nhóm
                      </button>
                    </div>
                    {spec.attributes.map((attr, attrIndex) => (
                      <div key={attrIndex} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Tên thuộc tính"
                          value={attr.name}
                          onChange={(e) => handleAttributeChange(attrIndex, "name", e.target.value)}
                          className="bg-gray-800 border border-gray-700 p-2 rounded w-1/2"
                        />
                        <input
                          type="text"
                          placeholder="Giá trị"
                          value={attr.value}
                          onChange={(e) => handleAttributeChange(attrIndex, "value", e.target.value)}
                          className="bg-gray-800 border border-gray-700 p-2 rounded w-1/2"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAttribute(attrIndex)}
                          className="text-red-400 text-sm hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddAttribute}
                      className="text-sm text-blue-400 hover:underline mt-1"
                    >
                      + Thêm thuộc tính
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4 p-4">
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

    </div>
  );
};

export default BookForm;
