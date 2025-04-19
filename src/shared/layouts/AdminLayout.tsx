import Sidebar from "../component/Sidebar/SidebarAdmin";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <main className="flex bg-gray-900 h-screen overflow-hidden">
      <div className="w-1/6 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default AdminLayout;