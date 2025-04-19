import { FaHome, FaTable, FaList, FaUser, FaMoneyBill, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout("Admin");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white text-gray-900 shadow-lg flex flex-col border-r border-gray-300">
      <div className="p-6 border-b border-gray-200 font-semibold text-lg text-gray-700">
        Xin chào, {user?.name ?? "Khách"}
      </div>

      <nav className="mt-4 flex flex-col gap-2 flex-grow">
        <SidebarItem to="/admin" icon={<FaHome />} text="Dashboard" />
        <SidebarItem to="/admin/product" icon={<FaTable />} text="Products" />
        <SidebarItem to="/admin/categories" icon={<FaList />} text="Categories" />
        <SidebarItem to="/admin/user" icon={<FaUser />} text="Users" />
        <SidebarItem to="/admin/bills" icon={<FaMoneyBill />} text="Bills" />
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-4 text-red-600 hover:bg-red-100 transition-all border-t border-gray-200"
      >
        <FaSignOutAlt />
        <span>Đăng xuất</span>
      </button>
    </aside>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center p-4 text-gray-800 hover:bg-gray-700 hover:text-white transition-all rounded-lg mx-2"
  >
    <span className="mr-3 text-lg">{icon}</span>
    <span className="text-base">{text}</span>
  </Link>
);

export default Sidebar;
