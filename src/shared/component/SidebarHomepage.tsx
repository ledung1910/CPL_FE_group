import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "English Books",
    leaves: [
      "Fiction - Literature",
      "Grammar, vocabulary & skills",
      "Art & Photography",
      "Biographies & Memoirs",
      "Business & Economics",
      "How-to - Self Help",
      "Children's Books",
      "Dictionary",
      "Education - Teaching",
      "Magazines",
      "Medical Books",
      "Parenting & Relationships",
      "Reference",
      "Science - Technology",
      "History, Politics & Social Sciences",
      "Travel & Holiday",
      "Cookbooks, Food & Wine",
    ],
  },
  {
    name: "Sách tiếng Việt",
    leaves: [
      "Sách tư duy - Kỹ năng sống",
      "Tác phẩm kinh điển",
      "Truyện ngắn - Tản văn - Tạp Văn",
      "Sách kỹ năng làm việc",
    ],
  },
  {
    name: "Văn phòng phẩm",
    leaves: [
      "Dịch vụ văn phòng",
      "Lịch",
      "Máy tính điện tử",
      "Thiết bị văn phòng",
    ],
  },
  {
    name: "Quà lưu niệm",
    leaves: ["Bookmark", "Album", "Đồng hồ cát", "Quả cầu tuyết"],
  },
];

const SidebarHomepage = () => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length > 0) {
      setExpandedCategories({ [categories[0].name]: true });
    }
  }, []);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const handleCategoryClick = (name: string) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/${encodedName}`);
  };

  return (
    <aside className="w-1/5 bg-white p-4 rounded-md ml-10 self-start">
      <h2 className="-mx-4 px-4 text-lg font-bold mb-3 pb-3 border-b border-gray-300">
        Khám phá theo danh mục
      </h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <div
              className="flex items-center justify-between text-gray-900 font-semibold cursor-pointer"
              onClick={() => toggleCategory(category.name)}
            >
              <span
                className="hover:text-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category.name);
                }}
              >
                {category.name}
              </span>
              {expandedCategories[category.name] ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-700" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-700" />
              )}
            </div>
            {expandedCategories[category.name] && category.leaves && (
              <ul className="ml-4 mt-2 space-y-2">
                {category.leaves.map((sub, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-gray-700 hover:text-blue-500 cursor-pointer"
                    onClick={() => handleCategoryClick(sub)}
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarHomepage;
