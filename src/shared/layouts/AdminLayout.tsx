import { useState } from "react";
import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="flex bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`transition-all duration-300 flex-grow p-4 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;
