import { useEffect, useState } from "react";

export const useSearch = (onSearch: (keyword: string) => void, debounceTime = 1) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const keyword = searchTerm.trim();
    const timer = setTimeout(() => {
      onSearch(keyword);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceTime]);

  const handleSearch = () => {
    const keyword = searchTerm.trim();
    onSearch(keyword);
  };

  return {searchTerm, setSearchTerm, handleSearch};
};
