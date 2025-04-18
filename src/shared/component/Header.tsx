import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPopup from "../../pages/CustomerPage/Login";
import RegisterPopup from "../../pages/CustomerPage/Register";
import logo from "../../assets/logo.png";
import { cartService } from "../../api/cart.service";
import { useSearch } from "../../hooks/useSearch";
import { FaShoppingCart, FaBars } from "react-icons/fa";

const AccountDropdown = ({ onClose, setCartCount }: { onClose: () => void, setCartCount: React.Dispatch<React.SetStateAction<number>> }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
      <Link
        to="/orders"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        onClick={onClose}
      >
        Đơn hàng của tôi
      </Link>
      <button
        onClick={() => {
          if (user?.role) {
            logout(user.role);
            setCartCount(0);
            onClose();
            navigate("/");
          }
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      >
        Đăng xuất
      </button>
    </div>
  );
};


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
            className={`flex gap-2 px-3 items-center text-sm font-medium text-gray-800 ${index !== commitments.length - 1 ? "border-r border-gray-300" : ""
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
const MobileNav = ({
  isOpen,
  onClose,
  onOpenLogin,
  onOpenRegister
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(cartService.getCartCount());

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(cartService.getCartCount());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  return (
    <div
      className={`block md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100%-60px)]">
        {/* Main Navigation */}
        <div className="p-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            onClick={onClose}
          >
            Trang chủ
          </Link>
        </div>
        {/* User Section */}
        <div className="border-t border-gray-200 p-4">
          {user ? (
            <>
              <div className="flex items-center px-4 py-2">

                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <Link
                  to="/user_profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  onClick={onClose}
                >
                  Thông tin tài khoản
                </Link>
                <Link
                  to="/user_orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  onClick={onClose}
                >
                  Đơn hàng của tôi
                </Link>
                <button
                  onClick={() => {
                    logout(user.role);
                    onClose();
                    navigate("/");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  onOpenLogin();
                  onClose();
                }}
                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 rounded"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => {
                  onOpenRegister();
                  onClose();
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>
        {/* Cart */}
        <div className="border-t border-gray-200 p-4">
          <Link
            to="/cart"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            onClick={onClose}
          ><img
              src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
              alt="cart"
              className="w-8 h-8"
            />
            <div className="relative">


              {cartCount > 0 && (
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FF424F] text-white text-xs font-semibold min-w-[16px] h-[16px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="ml-3">Giỏ hàng</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

type HeaderProps = {
  onSearch: (keyword: string) => void;
};


const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(cartService.getCartCount());
  const { searchTerm, setSearchTerm, handleSearch } = useSearch(onSearch);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);


  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(cartService.getCartCount());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    handleCartUpdate();

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const openMobileNav = () => {
    setMobileNavOpen(true);
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
  };

  const handleOpenLogin = () => {
    setLoginOpen(true);
  };


  return (
    <div>
      <div className="md:hidden bg-blue-500 text-white p-4 flex items-center justify-between">
        <button className="mr-4" onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button className="mr-4" onClick={openMobileNav}>
          <FaBars />
        </button>
        <div className="flex-1 bg-white text-gray-700 rounded-md flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-6a7 7 0 10-14 0 7 7 0 0014 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Bạn đang tìm kiếm gì"
            className="flex-1 border-none outline-none p-2 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/cart" className="relative ml-4">
          <FaShoppingCart />

          <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FF424F] text-white text-xs font-semibold min-w-[16px] h-[16px] flex items-center justify-center rounded-full">
            {cartCount}
          </span>

        </Link>

      </div>
      <div className="md:hidden bg-[#FFF0B3] rounded-md mx-4 my-2 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5v9.75a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V7.5m16.5 0L12 3 3.75 7.5m16.5 0L12 12m-8.25-4.5L12 12"
            />
          </svg>
          <span className="text-sm">
            <span className="text-blue-600 font-semibold">30 NGÀY</span>{" "}
            <span className="text-black font-medium">đổi ý & miễn phí trả hàng</span>
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={closeMobileNav}
        onOpenLogin={handleOpenLogin}
        onOpenRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
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
      <div className="hidden md:block">
        <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-50">
          <div className="ml-6">
            <button onClick={() => (window.location.href = "/")}>
              <img src={logo} alt="Logo" className="h-[90px] w-[110px]" />
            </button>
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
                    <AccountDropdown onClose={() => setDropdownOpen(false)} setCartCount={setCartCount} />
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
                </button>
              )}
            </div>

            <Link to="/cart" className="hover:text-blue-600 relative">
              <div className="relative">
                <img
                  src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                  alt="cart"
                  className="w-8 h-8"
                />
                <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#FF424F] text-white text-xs font-semibold min-w-[16px] h-[16px] flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              </div>
            </Link>
          </div>
        </div>
        <Commitments />
      </div>
    </div>
  );
};

export default Header;