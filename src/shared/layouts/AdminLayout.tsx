import { ReactNode, useContext, useEffect } from "react";
import Sidebar from "../component/Sidebar"
import { Outlet, useNavigate } from 'react-router-dom';



const AdminLayout = () => {
  const navigate = useNavigate()

  return (
      <main className="flex-grow flex">
        <Sidebar />
        <div className="content flex-grow p-4">
          <Outlet />
        </div>
      </main>
      
  )
}

export default AdminLayout;
