import React, { useEffect, useState } from 'react';
import { getBooks } from '../../api/book.service';
import { Book } from '../../../interfaces';

const HomePageMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [sortOption, setSortOption] = useState("popular"); // Default: Phổ biến
  const [filters, setFilters] = useState({
    now: false,
    topDeal: false,
    freeshipXtra: false,
  });

  // Theo dõi kích thước màn hình
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Fetch Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err) {
        console.error("Lỗi khi tải sách:", err);
      }
    };

    if (isMobile) {
      fetchBooks();
    }
  }, [isMobile]);

  // Tab options for sorting
  const tabOptions = [
    { label: "Phổ biến", value: "popular" },
    { label: "Bán chạy", value: "best_seller" },
    { label: "Hàng mới", value: "newest" },
    { label: "Giá ↑", value: "price_asc" },
    { label: "Giá ↓", value: "price_desc" },
  ];

  // Toggle filter
  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter and Sort Books based on selected options
  const filteredBooks = books
    .filter((book) => {
      if (filters.now && !book.is_ship_now) return false;
      if (filters.topDeal && !book.is_top_deal) return false;
      if (filters.freeshipXtra && !book.is_freeship_extra) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'price_asc':
          return (a.current_seller?.price || 0) - (b.current_seller?.price || 0);
        case 'price_desc':
          return (b.current_seller?.price || 0) - (a.current_seller?.price || 0);
        case 'best_seller':
          return (b.quantity_sold?.value || 0) - (a.quantity_sold?.value || 0);
        case 'popular':
        default:
          return b.rating_average - a.rating_average;
      }
    });

  if (!isMobile) return null;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white px-3 py-2">
        {/* Tabs */}
        <div className="flex gap-2 text-sm overflow-x-auto border-b border-gray-200 pb-2">
          {tabOptions.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSortOption(tab.value)}
              className={`px-3 py-1 rounded-full font-medium whitespace-nowrap outline-none
                ${
                  sortOption === tab.value
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-800 hover:bg-gray-200'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filter Badges */}
        <div className="flex gap-2 mt-3 overflow-x-auto text-xs items-center">
          <button
            onClick={() => {/* open modal filter hoặc sheet (nếu có) */}}
            className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-full text-gray-700"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L14 15.414V20a1 1 0 01-1.447.894l-4-2A1 1 0 018 18v-2.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Lọc
          </button>

          <span
            onClick={() => toggleFilter("now")}
            className={`cursor-pointer bg-[#FFEAE6] px-3 py-1 rounded-full text-[13px] font-semibold ${
              filters.now ? "text-white bg-gray-300" : "text-[#FF424E]"
            }`}
          >
            NOW
          </span>

          <span
            onClick={() => toggleFilter("topDeal")}
            className={`cursor-pointer bg-[#FFEAE6] px-3 py-1 rounded-full text-[13px] font-semibold ${
              filters.topDeal ? "text-white bg-gray-300" : "text-[#FF424E]"
            }`}
          >
             TOP DEAL
          </span>

          <span
            onClick={() => toggleFilter("freeshipXtra")}
            className={`cursor-pointer bg-[#E9F5FF] px-3 py-1 rounded-full text-[13px] font-semibold ${
              filters.freeshipXtra ? "bg-gray-300 text-white" : "text-[#1F9AFE]"
            }`}
          >
            FREESHIP XTRA
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg p-2 shadow-sm">
            <img
              src={book.images?.[0]?.large_url || "/placeholder-book.jpg"}
              alt={book.name}
              className="w-full h-36 object-cover rounded-md"
            />
            <h3 className="text-sm font-medium mt-2 line-clamp-2">{book.name}</h3>
            <div className="text-red-600 font-semibold text-base">
              {new Intl.NumberFormat("vi-VN").format(book.current_seller?.price || 0)}₫
            </div>
            {book.original_price && book.current_seller?.price && (
              <div className="text-xs text-gray-500 line-through">
                {new Intl.NumberFormat("vi-VN").format(book.original_price)}₫
              </div>
            )}
            {book.original_price && book.current_seller?.price && (
              <div className="text-xs text-green-600">
                -{Math.round(100 - (book.current_seller.price / book.original_price) * 100)}%
              </div>
            )}
            <div className="text-xs text-gray-600 mt-1">
              {book.is_ship_now ? "Giao 2h" : "Giao sau"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageMobile;
