import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPopup from "../../pages/CustomerPage/Login";
import RegisterPopup from "../../pages/CustomerPage/Register";
import logo from "../../assets/logo.png";

const AccountDropdown = ({ onClose }: { onClose: () => void }) => {
  const { user, logout } = useAuth();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
      <div className="px-4 py-2 text-sm text-gray-700 border-b">
        Xin chào, <strong>{user?.name}</strong>
      </div>
      <Link
        to="/user_profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        Thông tin tài khoản
      </Link>
      <button
        onClick={() => {
          logout();
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Đăng xuất
      </button>
    </div>
  );
};

// Component con: Cam kết
const Commitments = () => {
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

  return (
    <div className="flex items-center text-blue-900 gap-3 p-4 border-t border-b border-gray-300">
      <div className="text-lg font-semibold ml-7">Cam kết:</div>
      <div className="flex gap-4 items-center">
        {commitments.map((item, index) => (
          <div
            key={index}
            className={`flex gap-2 px-3 items-center text-sm font-medium text-gray-800 ${
              index !== commitments.length - 1 ? "border-r border-gray-300" : ""
            }`}
          >
            <img src={item.img} alt={`icon-${index}`} className="w-5 h-5" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

type HeaderProps = {
  onSearch: (keyword: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = () => {
    const keyword = searchTerm.trim();
    if (keyword) onSearch(keyword);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-50">
        {/* Logo */}
        <div className="ml-6">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <img src={logo} alt="Logo" className="h-[90px] w-[110px]" />
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 flex flex-col justify-center items-start ml-10">
          <div className="flex items-center w-full max-w-[900px] border border-gray-300 rounded-lg bg-white p-2">
            <img
              className="w-5 h-5 ml-2.5"
              src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
              alt="icon-search"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border-none outline-none text-sm p-2"
              placeholder="Nhập từ khóa..."
            />
            <button
              onClick={handleSearch}
              className="text-gray-800 text-sm px-4 py-1 border-l border-gray-300 rounded-r-lg"
            >
              Tìm kiếm
            </button>
          </div>

          {/* Keywords */}
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
            ].map((keyword, i) => (
              <span key={i} className="hover:underline">
                {keyword}
              </span>
            ))}
          </div>
        </div>

        {/* Menu phải */}
        <div className="flex items-center space-x-6 mb-10 pr-10">
          {/* Trang chủ */}
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

          {/* Tài khoản */}
          <div className="relative pr-6">
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center text-black gap-2 hover:text-blue-600"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                    alt="Tài khoản"
                    className="w-6 h-6"
                  />
                  {user.name}
                </button>
                {isDropdownOpen && (
                  <AccountDropdown onClose={() => setDropdownOpen(false)} />
                )}
              </div>
            ) : (
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
            )}
          </div>

          {/* Giỏ hàng */}
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

      {/* Cam kết */}
      <Commitments />

      {/* Popup đăng nhập / đăng ký */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </div>
  );
};

export default Header;
