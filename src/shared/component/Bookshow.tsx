import React, { useEffect, useState } from "react";
import { Book } from "../../interface";

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  const [imgSrc, setImgSrc] = useState(
    book.images?.[0]?.small_url || 
    book.images?.[0]?.base_url || 
    "/placeholder-book.jpg"
  );

  const discount = book.list_price && book.current_seller?.price 
    ? Math.round(100 - (book.current_seller.price / book.list_price * 100))
    : 0;

  const formatPrice = (price?: number) => {
    return price ? new Intl.NumberFormat('vi-VN').format(price) + 'đ' : "Liên hệ";
  };

  return (
    <div className="w-full mb-6 bg-white p-2">
      {/* 1. Hình ảnh sách (trên cùng) */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
        <img
          src={imgSrc}
          alt={book.name}
          className="w-full h-full object-cover"
          onError={() => setImgSrc("/placeholder-book.jpg")}
        />
      </div>

      {/* 2. Giá và % discount */}
      <div className="flex gap-2 items-end mb-1">
        <span className="text-red-500 font-bold text-lg">
          {formatPrice(book.current_seller?.price)}
        </span>
        {discount > 0 && (
          <span className="text-xs bg-gray-200 text-black px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* 3. Giá gốc (nếu có) */}
      {book.list_price && book.list_price !== book.current_seller?.price && (
        <div className="mb-2">
          <span className="text-xs text-gray-500 line-through">
            {formatPrice(book.list_price)}
          </span>
        </div>
      )}

      {/* 4. Tên tác giả */}
      {book.authors?.[0]?.name && (
        <p className="text-xs text-gray-600 mb-1 line-clamp-1">
          {book.authors[0].name}
        </p>
      )}

      {/* 5. Tên sách */}
      <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[40px]">
        {book.name}
      </h3>

      {/* 6. Rating và số lượng đã bán */}
      <div className="flex items-center">
        <div className="flex mr-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={`star-${book.id}-${i}`}
              className={`w-3 h-3 ${i < Math.floor(book.rating_average || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        {book.quantity_sold?.text && (
          <span className="text-xs text-gray-500">
            {book.quantity_sold.text}
          </span>
        )}
      </div>
    </div>
  );
};

const BookShow: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("Đang tải dữ liệu từ api.json...");
        const response = await fetch("/api.json");
        console.log("HTTP Status:", response.status);
  
        const data = await response.json();
        console.log("Dữ liệu nhận được:", data);
  
        setBooks(Array.isArray(data.books) ? data.books : []);
      } catch (err) {
        console.error("Lỗi khi tải sách:", err);
      }
    };
    fetchBooks();
  }, []);
  
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookItem key={`book-${book.id}`} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookShow;