import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const [menuItems, setMenuItems] = useState([
        { id: 1, name: 'Product Management', link: '/admin/product' },
        { id: 2, name: 'User Management', link: '/user' },
    ]);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 765) {
                setIsExpanded(false);
            } else {
                setIsExpanded(true);
            }
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <aside className={`flex flex-col bg-white border-t-1 border-r-1 border-[#c2c2c2] h-[calc(100vh-64px)] ${isExpanded ? "w-64" : "w-12"}`}>
            <div className="sidebar-top">
                <Link to={"/admin"} className="border-b border-slate-100 flex items-center">
                    <span className={`${isExpanded ? "block" : "hidden"}`}>Menu</span>
                </Link>
            </div>
            <div className="sidebar-menu flex-grow">
                {menuItems.map((item: any) => (
                    <Link key={item.id} to={item.link} className="border-b border-slate-100 flex items-center hover:bg-[#33adff] hover:text-white">
                        <span className={`${isExpanded ? "block" : "hidden"}`}>{item.name}</span>
                    </Link>
                ))}
            </div>
            <div className="sidebar-bottom flex justify-end">
                <button type="button" onClick={toggleSidebar} className="whitespace-nowrap  items-center" title="Toggle Sidebar">
                    Toggle
                </button>
            </div>
        </aside>
    )
}
export default Sidebar;