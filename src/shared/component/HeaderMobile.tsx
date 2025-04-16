import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderMobile = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="md:hidden relative z-50">
      {/* Header xanh */}
      <div className="bg-[#189EFF] flex items-center px-3 py-2 gap-2 relative">
        {/* Nút menu 3 gạch */}
        <button onClick={() => setShowUserMenu(!showUserMenu)}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Thanh tìm kiếm */}
        <div className="flex items-center bg-white rounded-md flex-1 px-2 py-1">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Bạn đang tìm kiếm gì"
            className="flex-1 text-sm outline-none"
          />
        </div>

        {/* Giỏ hàng */}
        <button onClick={() => navigate("/cart")} className="relative ml-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.3 5h11.6L17 13M6 18a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 h-4 flex items-center justify-center">
            4
          </span>
        </button>

        {/* Dropdown đẹp */}
        {showUserMenu && (
          <div className="absolute top-full left-2 right-2 mt-1 bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden animate-fadeIn z-50">
            <ul className="text-sm text-gray-700 divide-y divide-gray-100">
              <li
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/profile");
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M5.121 17.804A9 9 0 1118.878 6.196a9 9 0 01-13.757 11.608z"/>
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Tài khoản của tôi
              </li>
              <li
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/orders");
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M3 3h18v6H3V3zm0 6v12h18V9H3zm6 4h6"/>
                </svg>
                Đơn mua
              </li>
              <li
                onClick={() => {
                  setShowUserMenu(false);
                  navigate("/logout");
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2"
                     viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
                </svg>
                Đăng xuất
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Banner cam kết */}
      <div className="bg-[#FFF0C2] flex items-center px-4 py-2 text-sm text-gray-800 font-medium">
        <img
          src="https://salt.tikicdn.com/ts/upload/0b/f2/19/c03ae8f46956eca66845fb9aaadeca1e.png"
          alt="return"
          className="w-4 h-4 mr-2"
        />
        <span className="text-[#189EFF] font-bold mr-1">30 NGÀY</span>
        <span>đổi ý & miễn phí trả hàng</span>
        <svg className="w-4 h-4 ml-auto text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default HeaderMobile;
