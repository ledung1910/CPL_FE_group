import React, { useEffect, useState } from "react";
import ChevronUpIcon from "@heroicons/react/16/solid/ChevronUpIcon";
import ChevronDownIcon from "@heroicons/react/16/solid/ChevronDownIcon";

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
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

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

  return (
    <aside className="w-1/5 bg-white p-4 rounded-md ml-13 self-start">
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
                  <li
                    key={subIndex}
                    className="text-gray-700 hover:text-blue-500 cursor-pointer"
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

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-100 pt-5">
        {/* Breadcrumb */}
        <div className="pointer flex items-center space-x-1 text-gray-500 text-sm ml-13 mb-4">
          <span>Trang chủ</span>
          <span>{">"}</span>
          <span className="text-black font-medium">Nhà Sách Tiki</span>
        </div>
        <div className="flex items-start">
          {/* Sidebar */}
          <CategorySidebar />
          <div className="w-3/4 pl-4">
            <div className="title bg-white p-4 text-3xl">
              <span>Nhà sách Tiki</span>
            </div>
            {/* Slide */}
            <div className="slide">
              <div className="flex">
                <div className="flex w-full bg-white p-3 rounded-lg mt-4 mr-4">
                  {/* Hình ảnh bên trái */}
                  <div className="w-1/3 relative flex items-center justify-center">
                    {/* Ảnh mờ phía sau */}
                    <img
                      src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                      alt="1980books"
                      className="w-full blur-md"
                    />

                    {/* Ảnh nhỏ phía trước (ở giữa) */}
                    <img
                      src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                      alt="1980books"
                      className="absolute w-2/3"
                    />
                  </div>

                  {/* Nội dung bên phải */}
                  <div className="w-2/3 flex flex-col justify-start pl-4">
                    {/* Tiêu đề */}
                    <span className="text-lg font-bold text-gray-800 mt-2">
                      Top Sách Bán Chạy
                    </span>

                    {/* Tài trợ bởi */}
                    <div className="text-sm text-gray-600 mt-1">
                      Tài trợ bởi{" "}
                      <strong className="text-gray-900">
                        1980 Books Tại Tiki Trading
                      </strong>
                      <span className="ml-2 font-semibold">5/5</span>
                      <img
                        src="https://salt.tikicdn.com/ts/upload/04/53/8a/47482447a52b6728573f14e37e228e72.png"
                        alt="star"
                        className="inline-block w-4 h-4 translate-y-[-2px]"
                      />
                    </div>
                    {/* Danh sách sản phẩm */}
                    <div className="img-container flex gap-4 mt-8">
                      {[
                        {
                          img: "https://salt.tikicdn.com/cache/100x100/ts/product/83/23/b7/14a42ae4f66c9b8b298aaef4b9671442.jpg",
                          discount: "-32%",
                        },
                        {
                          img: "https://salt.tikicdn.com/cache/100x100/ts/product/90/49/97/ec88ab408c1997378344486c94dbac40.jpg.webp",
                          discount: "-32%",
                        },
                        {
                          img: "https://salt.tikicdn.com/cache/100x100/ts/product/0a/6c/f2/aaec7bcd7e61f8b6002fb6a537ef4b8f.jpg.webp",
                          discount: "-37%",
                        },
                      ].map((item, index) => (
                        <div key={index} className="relative">
                          <img
                            src={item.img}
                            alt=""
                            className="w-[50px] h-[70px] object-cover border border-gray-200"
                          />
                          <span className="absolute bottom-3 right-5 translate-x-1/2 translate-y-1/2 bg-[#FF424F] text-white text-xs font-semibold min-w-[35px] h-[16px] flex items-center justify-center rounded-full">
                            {item.discount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex w-full bg-white p-3 rounded-lg mt-4">
                  {/* Hình ảnh bên trái */}
                  <div className="w-1/3 relative flex items-center justify-center">
                    {/* Ảnh mờ phía sau */}
                    <img
                      src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                      alt="1980books"
                      className="w-full blur-md opacity-90"
                    />

                    {/* Ảnh nhỏ phía trước (ở giữa) */}
                    <img
                      src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                      alt="1980books"
                      className="absolute w-2/3"
                    />
                  </div>

                  {/* Nội dung bên phải */}
                  <div className="w-2/3 flex flex-col justify-start pl-4">
                    {/* Tiêu đề */}
                    <span className="text-lg font-bold text-gray-800 mt-2">
                      Top Sách Bán Chạy
                    </span>

                    {/* Tài trợ bởi */}
                    <div className="text-sm text-gray-600 mt-1">
                      Tài trợ bởi{" "}
                      <strong className="text-gray-900">
                        1980 Books Tại Tiki Trading
                      </strong>
                      <span className="ml-2 font-semibold">5/5</span>
                      <img
                        src="https://salt.tikicdn.com/ts/upload/04/53/8a/47482447a52b6728573f14e37e228e72.png"
                        alt="star"
                        className="inline-block w-4 h-4 translate-y-[-2px]"
                      />
                    </div>
                    {/* Danh sách sản phẩm */}
                    <div className="img-container flex gap-4 mt-8">
                      {[
                        {
                          img: "https://salt.tikicdn.com/cache/100x100/ts/product/83/23/b7/14a42ae4f66c9b8b298aaef4b9671442.jpg",
                          discount: "-32%",
                        },
                        {
                          img: "https://salt.tikicdn.com/cache/100x100/ts/product/90/49/97/ec88ab408c1997378344486c94dbac40.jpg.webp",
                          discount: "-32%",
                        },
                        {
                          img: "https://salt.tikicdn.com/cache/100x100/ts/product/0a/6c/f2/aaec7bcd7e61f8b6002fb6a537ef4b8f.jpg.webp",
                          discount: "-37%",
                        },
                      ].map((item, index) => (
                        <div key={index} className="relative">
                          <img
                            src={item.img}
                            alt=""
                            className="w-[50px] h-[70px] object-cover border border-gray-200"
                          />
                          <span className="absolute bottom-3 right-5 translate-x-1/2 translate-y-1/2 bg-[#FF424F] text-white text-xs font-semibold min-w-[35px] h-[16px] flex items-center justify-center rounded-full">
                            {item.discount}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="slick-dots flex justify-center items-center space-x-1 mt-4">
                <div className="slick-active">
                  <div className="w-5 h-[1.5px] bg-blue-500 rounded-full"></div>{" "}
                </div>
                <div>
                  <div className="w-4 h-[1.5px] bg-gray-400 rounded-full"></div>{" "}
                </div>
                <div>
                  <div className="w-4 h-[1.5px] bg-gray-400 rounded-full"></div>{" "}
                </div>
                <div>
                  <div className="w-4 h-[1.5px] bg-gray-400 rounded-full"></div>{" "}
                </div>
                <div>
                  <div className="w-4 h-[1.5px] bg-gray-400 rounded-full"></div>{" "}
                </div>
              </div>
              <div className="button toggle relative">
                <div className="img flex justify-center ml-auto relative z-10">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png"
                    alt="Image"
                    className="w-[32px] h-[56px] absolute top-[-150px] right-[0px] z-20 opacity-50"
                  />
                </div>
                <div className="img flex justify-center ml-auto relative z-10">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/6b/59/c2/b61db5f1c32cfdc6d75e59d4fac2dbe8.png"
                    alt="Image"
                    className="w-[32px] h-[56px] absolute top-[-150px] left-[0px] z-20 opacity-50 transform scale-x-[-1]"
                  />
                </div>
              </div>
            </div>
            {/* Khám phá theo danh mục */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                Khám phá theo danh mục
              </h2>
              <div className="grid grid-cols-4 ml-[5px]">
                {[
                  {
                    name: "English Books",
                    img: "https://salt.tikicdn.com/ts/category/cc/66/3d/4e4f1b8b1e772fe9e09611c6bec98746.png",
                  },
                  {
                    name: "Sách tiếng Việt",
                    img: "https://salt.tikicdn.com/ts/category/53/0f/bc/f6e936554ec845b45af8f94cbd4f1569.png",
                  },
                  {
                    name: "Văn phòng phẩm",
                    img: "https://salt.tikicdn.com/ts/category/45/ab/0f/cffe9f60a7b37e0f87a9c50c4478aed9.png",
                  },
                  {
                    name: "Quà lưu niệm",
                    img: "https://salt.tikicdn.com/ts/category/17/59/4f/af1292bf74c4d2862afd269bdfd42a62.png",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <p className="text-sm mt-2">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tất cả sản phẩm */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
              <h2 className="text-lg font-semibold mb-4">Tất cả sản phẩm</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Giao siêu tốc 2H</span>
                </label>
                <span className="text-red-500 font-semibold">🔥 TOP DEAL</span>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>FREESHIP XTRA</span>
                </label>
                <span className="flex items-center text-yellow-500">
                  ⭐ 4 sao trở lên
                </span>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium mr-2">Sắp xếp:</label>
                <select className="p-2 border rounded-md">
                  <option>Phổ biến</option>
                  <option>Giá thấp đến cao</option>
                  <option>Giá cao đến thấp</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
