import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRealCategories } from "../../api/book.service";
import { Category } from "../../../interfaces";

const SidebarHomepage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getRealCategories();
      setCategories(result);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (name: string) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/?category=${encodedName}`);
  };

  return (
    <aside className="w-1/5 bg-white p-4 rounded-md ml-10 self-start">
      <h2 className="-mx-4 px-4 text-lg font-bold mb-3 pb-3 border-b border-gray-300">
        Khám phá theo danh mục
      </h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="text-gray-800 font-medium cursor-pointer hover:text-blue-600"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarHomepage;
