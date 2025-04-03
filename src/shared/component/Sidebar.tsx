import { FaBars, FaHome, FaTable, FaList, FaUser, FaMoneyBill } from "react-icons/fa";
import { Link } from "react-router-dom";

// Định nghĩa kiểu dữ liệu cho props
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white text-gray-900 shadow-lg transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      } flex flex-col border-r border-gray-300`}
    >
      {/* Nút mở rộng/thu nhỏ sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-gray-700 hover:text-gray-900 transition-all self-end"
      >
        <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-400 transition-all">
          <FaBars size={18} />
        </div>
      </button>

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-2">
        <SidebarItem to="/admin" icon={<FaHome />} text="Dashboard" isOpen={isOpen} />
        <SidebarItem to="/admin/product" icon={<FaTable />} text="Products" isOpen={isOpen} />
        <SidebarItem to="/admin/categories" icon={<FaList />} text="Categories" isOpen={isOpen} />
        <SidebarItem to="/admin/user" icon={<FaUser />} text="Users" isOpen={isOpen} />
        <SidebarItem to="/admin/bills" icon={<FaMoneyBill />} text="Bills" isOpen={isOpen} />
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text, isOpen }) => (
  <Link
    to={to}
    className="flex items-center p-4 text-gray-800 hover:bg-gray-700 hover:text-white transition-all rounded-lg mx-2"
  >
    <span className="mr-3 text-lg">{icon}</span>
    {isOpen && <span className="text-base">{text}</span>}
  </Link>
);

export default Sidebar;
