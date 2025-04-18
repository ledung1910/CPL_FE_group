import { useEffect, useState } from "react";

export const useSearch = (onSearch: (keyword: string) => void, debounceTime = 0) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Gọi onSearch sau debounceTime kể cả khi chuỗi rỗng (để reset)
  useEffect(() => {
    const keyword = searchTerm.trim();

    const timer = setTimeout(() => {
      onSearch(keyword); // Gọi luôn cả khi rỗng
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceTime]);

  // Gọi ngay lập tức khi người dùng nhấn nút tìm kiếm (nếu bạn có nút)
  const handleSearch = () => {
    const keyword = searchTerm.trim();
    onSearch(keyword); // Gọi luôn cả khi rỗng
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
  };
};
