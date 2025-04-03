import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Login from "../../pages/CustomerPage/Login";
import { useState } from "react";

const commitments = [
  {
    img: "https://salt.tikicdn.com/ts/upload/96/76/a3/16324a16c76ee4f507d5777608dab831.png",
    text: "100% hàng thật",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/11/09/ec/456a2a8c308c2de089a34bbfef1c757b.png",
    text: "Freeship mọi đơn",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/0b/f2/19/c03ae8f46956eca66845fb9aaadeca1e.png",
    text: "Hoàn 200% nếu hàng giả",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/3a/f4/7d/86ca29927e9b360dcec43dccb85d2061.png",
    text: "30 ngày đổi trả",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/87/98/77/fc33e3d472fc4ce4bae8c835784b707a.png",
    text: "Giao nhanh 2h",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/6a/81/06/0675ef5512c275a594d5ec1d58c37861.png",
    text: "Giá siêu rẻ",
  },
];

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 ">
        <div className="ml-6">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-[90px] w-[110px]" />
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start ml-10">
          <div className="flex items-center w-full max-w-[900px] border border-gray-300 rounded-lg bg-white p-2">
            <img
              className="w-5 h-5 ml-2.5"
              src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
              alt="icon-search"
            />
            <input
              type="text"
              className="flex-1 border-none outline-none text-sm p-2"
              placeholder="Nhập từ khóa..."
            />
            <button className="text-gray-800 text-sm px-4 py-1 border-l border-gray-300 rounded-r-lg">
              Tìm kiếm
            </button>
          </div>
          <div className="flex gap-3 mt-2 text-gray-700 text-sm cursor-pointer">
            {[
              "Điện gia dụng",
              "Xe cộ",
              "Mẹ & bé",
              "Khỏe đẹp",
              "Nhà cửa",
              "Sách",
              "Thể thao",
              "Harry Potter",
              "Lịch 2024",
              "Nguyễn Nhật Ánh",
            ].map((keyword, index) => (
              <span key={index} className="hover:underline">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-6 mb-10 pr-10">
          <Link
            to="/"
            className="flex items-center text-black gap-2 hover:text-blue-600"
          >
            <img
              src="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
              alt="Trang chủ"
              className="w-6 h-6"
            />
            Trang chủ
          </Link>

          <div className="relative pr-6">
            <button
              className="flex items-center text-black gap-2 hover:text-blue-600"
              onClick={() => setLoginOpen(true)}
            >
              <img
                src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                alt="Tài khoản"
                className="w-6 h-6"
              />
              Tài khoản
              <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-5 w-px bg-gray-300"></span>
            </button>
          </div>

          <Link to="/cart" className="hover:text-blue-600 relative">
            <div className="relative">
              <img
                src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                alt="cart"
                className="w-8 h-8"
              />
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FF424F] text-white text-xs font-semibold min-w-[16px] h-[16px] flex items-center justify-center rounded-full">
                0
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex items-center text-blue-900 gap-3 p-4 border-t border-b border-gray-300">
        <div className="text-lg font-semibold ml-7">Cam kết:</div>
        <div className="flex gap-4 items-center">
          {commitments.map((item, index) => (
            <div
              className={`flex gap-2 px-3 items-center text-sm font-medium text-gray-800 ${index !== commitments.length - 1
                ? "border-r border-gray-300"
                : ""
                }`}
              key={index}
            >
              <img src={item.img} alt={`icon-${index}`} className="w-5 h-5" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default Header;
