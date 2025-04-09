import React, { useEffect, useState } from "react";
import { Book } from "../../../interfaces";

type BookShowProps = {
  filters: {
    shipNow: boolean;
    topDeal: boolean;
    freeshipExtra: boolean;
    rating: boolean;
    sortBy: string; 
  };
  keyword: string;
};

const BookItem: React.FC<{ book: Book }> = ({ book }) => {
  const [imgSrc, setImgSrc] = useState(
    book.images?.[0]?.large_url ||
    "/placeholder-book.jpg"
  );

  const discount =
    book.list_price && book.current_seller?.price
      ? Math.round(100 - (book.current_seller.price / book.list_price) * 100)
      : 0;

  const formatPrice = (price?: number) => {
    if (!price) return "Liên hệ";
    const formatted = new Intl.NumberFormat("vi-VN").format(price);
    return (
      <>
        {formatted}
        <sup className="text-[10px] relative -top-[5px] underline">đ</sup>
      </>
    );
  };

  return (
    <div className="w-full mb-6 bg-white relative pb-12">
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-3">
        <img
          src={imgSrc}
          alt={book.name}
          className="w-full h-full object-cover"
          onError={() => setImgSrc("/placeholder-book.jpg")}
        />
        <img
          src={
            book.is_freeship_extra && book.is_top_deal
              ? "https://salt.tikicdn.com/ts/upload/21/c9/ce/ecf520f4346274799396496b3cbbf7d8.png"
              : book.is_freeship_extra
                ? "https://salt.tikicdn.com/ts/upload/f7/9e/83/ab28365ea395893fe5abac88b5103444.png"
                : book.is_top_deal
                  ? "https://salt.tikicdn.com/ts/upload/12/e2/4a/c5226426ee9429b0050449ae5403c9cf.png"
                  : "https://salt.tikicdn.com/ts/upload/c2/bc/6d/ff18cc8968e2bbb43f7ac58efbfafdff.png"
          }
          alt="status-icon"
          className="absolute top-5 left-1 w-100 h-100 object-contain"
        />
      </div>

      <div className="flex gap-2 items-end mb-1 pr-2 pl-2">
        <span className="text-red-500 font-medium text-lg">
          {formatPrice(book.current_seller?.price)}
        </span>
        {discount > 0 && (
          <span className="text-xs bg-gray-200 text-black px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {book.authors?.[0]?.name && (
        <p className="text-sm text-gray-600 mb-1 line-clamp-1 pr-2 pl-2 pt-2">
          {book.authors[0].name}
        </p>
      )}

      <h3 className="font-normal text-sm line-clamp-2 pr-2 pl-2">
        {book.name}
      </h3>

      <div className="flex items-center mt-2 pl-2 pb-15">
        {book.rating_average ? (
          <>
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={`star-${book.id}-${i}`}
                  className={`w-3 h-3 ${i < Math.floor(book.rating_average)
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
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
          </>
        ) : (
          <span className="text-xs text-gray-500 italic"></span>
        )}
      </div>

      <div className="absolute bottom-2 left-0 right-0 px-4">
        <div className="py-1 px-1 text-sm text-gray-500 flex items-center gap-2 border-t border-gray-300 bg-white rounded font-medium">
          {book.is_ship_now ? (
            <>
              <img
                src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                alt="ship-icon"
                className="w-9 h-5"
              />
              <span>Ship trong 2h</span>
            </>
          ) : (
            <span>Giao thứ 3, 01/04</span>
          )}
        </div>
      </div>
    </div>
  );
};

const BookShow: React.FC<BookShowProps> = ({ filters,keyword }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api.json");
        const data = await response.json();
        setBooks(Array.isArray(data.books) ? data.books : []);
      } catch (err) {
        console.error("Lỗi khi tải sách:", err);
      }
    };
    fetchBooks();
  }, []);

  // Apply filters
  const keywordLower = keyword.toLowerCase().trim();
  const filteredBooks = books
    .filter((book) => {
      
      if (
        keywordLower &&
        !book.name.toLowerCase().includes(keywordLower) &&
        !book.authors?.some((author) =>
          author.name.toLowerCase().includes(keywordLower)
        )
      ) {
        return false;
      }
      if (filters.shipNow && !book.is_ship_now) return false;
      if (filters.topDeal && !book.is_top_deal) return false;
      if (filters.freeshipExtra && !book.is_freeship_extra) return false;
      if (filters.rating && book.rating_average < 4) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "priceAsc":
          return (a.current_seller?.price || 0) - (b.current_seller?.price || 0);
        case "priceDesc":
          return (b.current_seller?.price || 0) - (a.current_seller?.price || 0);
        case "rating":
          return (b.rating_average || 0) - (a.rating_average || 0);
          case "sold": {
            const soldA = parseInt(String(a.quantity_sold?.value ?? "0"));
            const soldB = parseInt(String(b.quantity_sold?.value ?? "0"));
            return soldB - soldA;
          }
          
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookItem key={`book-${book.id}`} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookShow;
