import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Product Management', link: '/admin/product' },
        { id: 2, name: 'User Management', link: '/admin/user' },
        { id: 3, name: 'Categories Management', link: '/admin/categories' },
        { id: 4, name: 'Bill Management', link: '/admin/bills' },
    ]);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 765) {
                setIsExpanded(false);
            } else {
                setIsExpanded(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <aside className={`flex flex-col bg-white shadow-md h-screen p-4 ${isExpanded ? "w-64" : "w-20"} transition-all duration-300`}>
            <div className="flex items-center gap-3 border-b pb-4">
                <img src="https://via.placeholder.com/40" alt="User" className="rounded-full" />
                {isExpanded && (
                    <div>
                        <h2 className="text-sm font-semibold">Duy Le</h2>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                )}
                <button className="ml-auto text-gray-400">
                    <FaCog />
                </button>
            </div>
            <nav className="mt-4 flex flex-col gap-2">
                {menuItems.map((item) => (
                    <Link key={item.id} to={item.link} className="text-gray-700 text-sm font-medium p-2 rounded-md hover:bg-blue-500 hover:text-white transition-all">
                        {item.name}
                    </Link>
                ))}
            </nav>
            <div className="mt-auto pt-4 border-t">
                <p className="text-xs text-gray-500 font-semibold uppercase">Applications</p>
                <Link to="/admin/users" className="text-gray-700 text-sm font-medium p-2 rounded-md hover:bg-blue-500 hover:text-white transition-all block">
                    Users
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;