import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Banner from "../component/Banner";
import Footer from "../component/Footer";
import ChevronUpIcon from "@heroicons/react/16/solid/ChevronUpIcon";
import ChevronDownIcon from "@heroicons/react/16/solid/ChevronDownIcon";

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: string;
  description: string;
}

const categories = [
  {
    name: "English Books",
    subcategories: [
      "Art & Photography",
      "Biographies & Memoirs",
      "Business & Economics",
      "How-to - Self Help",
      "Children's Books",
      "Dictionary",
      "Education - Teaching",
      "Fiction - Literature",
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
  { name: "Sách tiếng Việt" },
  { name: "Văn phòng phẩm" },
  { name: "Quà lưu niệm" },
];

const CategorySidebar = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  return (
    <aside className="w-1/5 bg-white p-4 rounded-md ml-9">
      <h2 className="text-lg font-bold mb-3">Khám phá theo danh mục</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <div
              className="flex items-center justify-between text-gray-900 font-semibold cursor-pointer"
              onClick={() => toggleCategory(category.name)}
            >
              <span>{category.name}</span>
              {expandedCategories[category.name] ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-700" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-700" />
              )}
            </div>
            {expandedCategories[category.name] && category.subcategories && (
              <ul className="ml-4 mt-2 space-y-2">
                {category.subcategories.map((sub, subIndex) => (
                  <li key={subIndex} className="text-gray-700 hover:text-blue-500 cursor-pointer">
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

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api.json");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Lỗi API:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Banner />
      <Header />
      <div className="bg-gray-100 pt-5">
        {/* Breadcrumb */}
        <div className="pointer flex items-center space-x-1 text-gray-500 text-sm ml-13">
          <span>Trang chủ</span>
          <span>{">"}</span>
          <span className="text-black font-medium">Nhà Sách Tiki</span>
        </div>
        <div className="flex container">
          {/* Sidebar */}
          <CategorySidebar />
          <div className="w-3/4 p-4">
            <h1 className="text-xl font-bold mb-4">Danh sách sản phẩm</h1>
            <div className="grid grid-cols-3 gap-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.id} className="border p-4 rounded-md shadow-md">
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
                    <h2 className="text-lg font-medium mt-2">{product.name}</h2>
                    <p className="text-red-500 font-semibold">{product.originalPrice} $</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Không có sản phẩm nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
