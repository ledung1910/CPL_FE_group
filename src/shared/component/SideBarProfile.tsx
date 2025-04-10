import { Link, useLocation } from "react-router-dom";
import { User, Bell, BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SidebarProfile = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <div className="w-1/4 rounded-xl">
      <p className="text-gray-500 text-l">
        <Link to="/" className="hover:underline">Trang chủ</Link>
        <span className="font-bold text-black">Tài khoản</span>
      </p>

      <div className="flex items-center pb-4 mt-3">
        <div className="w-13 h-13 bg-gray-300 rounded-full mb-2 mr-3 mt-2"></div>
        <div className="flex-col">
          <p className="text-gray-500">Tài khoản của</p>
          <p className="font-semibold text-lg">{user.name}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link to="/user_profile">
          <div
            className={`flex items-center gap-3 text-sm px-2 py-2 rounded cursor-pointer ${
              isActive("/user_profile")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <User size={20} />
            <p>Thông tin tài khoản</p>
          </div>
        </Link>

        <Link to="/notifications">
          <div
            className={`flex items-center gap-3 text-sm px-2 py-2 rounded cursor-pointer ${
              isActive("/notifications")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <Bell size={20} />
            <p>Thông báo của tôi</p>
          </div>
        </Link>

        <Link to="/order_tracking">
          <div
            className={`flex items-center gap-3 text-sm px-2 py-2 rounded cursor-pointer ${
              isActive("/order_tracking")
                ? "text-blue-600 font-medium bg-blue-50"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            <BookOpen size={20} />
            <p>Quản lý đơn hàng</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SidebarProfile;
