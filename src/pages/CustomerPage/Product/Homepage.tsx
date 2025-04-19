import React, { useEffect, useState } from "react";
import { FaStar, FaFilter } from "react-icons/fa";
import BookShow from "../../../shared/component/Bookshow";
import { useOutletContext, useSearchParams } from "react-router-dom";
import SidebarHomepage from "../../../shared/component/Sidebar/SidebarHomepage";
import { Category } from "../../../../interfaces";
import { getRealCategories } from "../../../api/book.service";

const topProducts = [
  {
    name: "NEXUS - Lược Sử Của Những Mạng Lưới Thông Tin Từ Thời Đại Đồ Đá Đến Trí Tuệ Nhân Tạo",
    price: "365.600đ",
  },
  {
    name: "Chat GPT Thực Chiến",
    price: "110.000đ",
  },
  {
    name: "Dán Dát Một Bây Sối Hay Chân Một Dàn Cửu",
    price: "127.000đ",
  },
  {
    name: "Theo Tùng Tâm Lý",
    price: "115.100đ",
  },
  {
    name: "Giải mã Hoóc-môn Dopamine",
    price: "145.000đ",
  },
  {
    name: "Personal Best American B1+ Intermediate Pack B",
    price: "228.920đ",
  },
  {
    name: "Bookmark kẹp sách giấy cứng",
    price: "2.000đ",
  },
  {
    name: "Here U Ave – Tập 3",
    price: "119.000đ",
  },
  {
    name: "Blue Period - Tập 03",
    price: "45.500đ",
  },
  {
    name: "Semantic Error – Lỗi Logic (Tập 2)",
    price: "161.000đ",
  },
];

const HomePage = () => {
  const [filters, setFilters] = useState({
    shipNow: false,
    topDeal: false,
    freeshipExtra: false,
    rating: false,
    sortBy: "Phổ biến",
  });
  const { keyword: desktopKeyword } = useOutletContext<{ keyword: string }>();
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category") || "";
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number>(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getRealCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categoryName && categories.length > 0) {
      const matched = categories.find(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      );
      setCategoryId(matched?.id ?? 0);
    }
  }, [categoryName, categories]);

  const handleMobileSort = (sortByValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: sortByValue,
    }));
  };

  const handleMobileFilter = (filterType: keyof typeof filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: !prevFilters[filterType],
    }));
  };

  const resetToDefault = () => {
    setFilters({
      shipNow: false,
      topDeal: false,
      freeshipExtra: false,
      rating: false,
      sortBy: "Phổ biến",
    });
  };

  const isSortActive = (sortValue: string) => {
    return filters.sortBy === sortValue;
  };

  const isFilterActive = (filterValue: boolean) => {
    return filterValue;
  };
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden bg-gray-100">
        <div className="bg-white px-3 py-2 mt-4 flex justify-center items-center border-b text-sm text-gray-800 font-normal gap-x-2">
          {[
            { label: "Phổ biến", value: "Phổ biến" },
            { label: "Bán chạy", value: "sold" },
            { label: "Hàng mới", value: "newest" },
            { label: "Giá ↑", value: "priceAsc" },
            { label: "Giá ↓", value: "priceDesc" },
          ].map((sort, index, arr) => (
            <React.Fragment key={sort.value}>
              <button
                className={`px-1 py-0.5 ${isSortActive(sort.value)
                    ? "text-blue-600 font-medium"
                    : "text-gray-800"
                  }`}
                onClick={() => {
                  handleMobileSort(sort.value);
                  if (sort.value === "Phổ biến") resetToDefault();
                }}
              >
                {sort.label}
              </button>
              {index < arr.length - 1 && <span className="text-gray-400 px-1">·</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white px-3 py-2 flex justify-center items-center gap-4 overflow-x-auto  text-sm">
          <button className="flex items-center gap-1 text-gray-800">
            <FaFilter className="text-lg" />
            <span>Lọc</span>
          </button>

          <button
            className={`px-3 py-1 rounded-full font-semibold text-xs ${isFilterActive(filters.shipNow)
                ? "bg-red-500 text-white shadow"
                : "bg-red-100 text-red-500"
              }`}
            onClick={() => handleMobileFilter("shipNow")}
          >
            NOW
          </button>

          <button
            className={`px-3 py-1 rounded-full font-semibold text-xs flex items-center gap-1 ${isFilterActive(filters.topDeal)
                ? "bg-red-500 text-white shadow"
                : "bg-red-100 text-red-500"
              }`}
            onClick={() => handleMobileFilter("topDeal")}
          >
            <span className="text-[13px]">👍</span> TOP DEAL
          </button>

          <button
            className={`px-3 py-1 rounded-full font-semibold text-xs ${isFilterActive(filters.freeshipExtra)
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-100 text-blue-600"
              }`}
            onClick={() => handleMobileFilter("freeshipExtra")}
          >
            FREESHIP XTRA
          </button>
        </div>
        <div className="mt-2 ml-4 mr-4">
          <BookShow
            filters={filters}
            keyword={desktopKeyword}
            category={categoryId ?? 0}
          />
        </div>
      </div>

      <div className="hidden md:block">
        <div className="bg-gray-100 mt-4">
          <div className="pointer flex items-center space-x-1 text-gray-500 text-sm ml-10 mb-4">
            <span>Trang chủ</span>
            <span>{">"}</span>
            <span className="text-black font-medium">Nhà Sách Tiki</span>
          </div>
          <div className="flex items-start">
            <SidebarHomepage />
            <div className="w-3/4 pl-4">
              <div className="title bg-white p-4 text-3xl">
                <span>Nhà sách Tiki</span>
              </div>
              <div className="slide">
                <div className="flex">
                  <div className="flex w-full bg-white p-3 rounded-lg mt-4 mr-4">
                    <div className="w-1/3 relative flex items-center justify-center">
                      <img
                        src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                        alt="1980books"
                        className="w-full blur-md"
                      />
                      <img
                        src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                        alt="1980books"
                        className="absolute w-2/3"
                      />
                    </div>

                    <div className="w-2/3 flex flex-col justify-start pl-4">
                      <span className="text-lg font-bold text-gray-800 mt-2">
                        Top Sách Bán Chạy
                      </span>

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
                    <div className="w-1/3 relative flex items-center justify-center">
                      <img
                        src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                        alt="1980books"
                        className="w-full blur-md opacity-90"
                      />

                      <img
                        src="https://salt.tikicdn.com/cache/w200/ts/tka/1c/a1/00/32b0e70d3c6db98a03f300e89480bc72.png"
                        alt="1980books"
                        className="absolute w-2/3"
                      />
                    </div>

                    <div className="w-2/3 flex flex-col justify-start pl-4">
                      <span className="text-lg font-bold text-gray-800 mt-2">
                        Top Sách Bán Chạy
                      </span>

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

              <div className="bg-white p-4 rounded-lg mt-4">
                <h2 className="text-lg font-semibold mb-4">
                  Khám phá theo danh mục
                </h2>
                <div className="flex mb-4">
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
                    <div key={index} className="flex flex-col items-center ml-20">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-20 h-20 rounded-full"
                      />
                      <p className="text-sm mt-2">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg mt-6">
                <h2 className="text-lg font-semibold mb-4">Tất cả sản phẩm</h2>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 pr-4 border-r border-gray-300">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filters.shipNow}
                      onChange={() => handleMobileFilter("shipNow")}
                    />
                    <img
                      src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                      alt=""
                      className="w-9 h-4"
                    />
                    <span>Giao siêu tốc 2H</span>
                  </label>

                  <label className="flex items-center space-x-2 pr-4 border-r border-gray-300">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filters.topDeal}
                      onChange={() => handleMobileFilter("topDeal")}
                    />
                    <img
                      src="https://salt.tikicdn.com/ts/upload/b5/aa/48/2305c5e08e536cfb840043df12818146.png"
                      alt=""
                      className="w-20 h-4"
                    />
                    <span>Siêu rẻ</span>
                  </label>

                  <label className="flex items-center space-x-2 pr-4 border-r border-gray-300">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filters.freeshipExtra}
                      onChange={() => handleMobileFilter("freeshipExtra")}
                    />
                    <img
                      src="https://salt.tikicdn.com/ts/upload/2f/20/77/0f96cfafdf7855d5e7fe076dd4f34ce0.png"
                      alt=""
                      className="w-20 h-4"
                    />
                    <span>Freeship</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      checked={filters.rating}
                      onChange={() => handleMobileFilter("rating")}
                    />
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                      <FaStar className="text-gray-400" />
                    </div>
                    <span>từ 4 sao</span>
                  </label>
                </div>

                <div className="mt-10">
                  <label className="text-sm text-gray-600 mr-2">Sắp xếp</label>
                  <select
                    title="Sắp xếp"
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                    }
                    className="px-3 py-1 border border-gray-400 rounded-2xl text-sm w-[130px]"
                  >
                    <option value="Phổ biến">Phổ biến</option>
                    <option value="sold">Bán chạy</option>
                    <option value="priceAsc">Giá thấp đến cao</option>
                    <option value="priceDesc">Giá cao đến thấp</option>
                    <option value="rating">Đánh giá cao</option>
                  </select>
                </div>
              </div>
              <BookShow
                filters={filters}
                keyword={desktopKeyword}
                category={categoryId ?? 0}
              />
            </div>
          </div>
          <div className="bg-white p-6 mb-6 mt-8 m-10">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Tìm Kiếm Liên Quan
            </h2>
          </div>
          <div className="bg-white rounded-lg p-6 m-10">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Top Bán Chạy Sản Phẩm Nhà Sách Tiki
            </h2>
            <div>
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-1"
                >
                  <div className="flex items-center">
                    <span className="text-gray-500 font-medium w-6">
                      {index + 1}.
                    </span>
                    <p className="text-blue-600 text-sm hover:underline cursor-pointer">
                      {product.name}
                    </p>
                  </div>

                  <p className="text-gray-800 text-sm font-medium">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;