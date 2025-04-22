import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

interface SidebarProfileProps {
    orderId?: string;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ orderId }) => {
    const { user } = useAuth();
    const location = useLocation();

    const breadcrumbMap: { [key: string]: string } = {
        "/user_profile": "Tài khoản",
        "/orders": "Đơn hàng",
        "/notifications": "Thông báo",
    };
    const currentPath = location.pathname;
    let breadcrumbLabel = breadcrumbMap[currentPath] || "Tài khoản";

    if (currentPath.startsWith("/orders/") && currentPath !== "/orders" && orderId) {
        breadcrumbLabel = `Đơn hàng số ${orderId}`;
    }

    const isActive = (path: string) => location.pathname === path;

    if (!user) return null;

    return (
        <div className="hidden md:block w-full md:w-1/5 rounded-xl">
            <p className="text-gray-500 text-base mb-2">
                <Link to="/" className="hover:underline">Trang chủ</Link> &gt;{" "}
                {currentPath.startsWith("/orders/") && currentPath !== "/orders" && orderId ? (
                    <>
                        <Link to="/orders" className="hover:underline">Đơn hàng</Link> &gt;{" "}
                        <span className="text-gray-800 text-base">ID: {orderId}</span>
                    </>
                ) : (
                    <span className="text-gray-800 text-base">{breadcrumbLabel}</span>
                )}
            </p>

            <div className="flex items-center">
                <img
                    src="/public/images/avatar.png"
                    alt="Ảnh đại diện"
                    className="w-12 h-12 bg-gray-300 rounded-full mr-3"
                />
                <div className="flex flex-col">
                    <p className="text-gray-500 text-sm">Tài khoản của</p>
                    <p className="font-semibold text-[15px]">{user.name}</p>
                </div>
            </div>

            <div className="space-y-2">
                <SidebarLink
                    to="/user_profile"
                    icon="/public/images/user.png"
                    label="Thông tin tài khoản"
                    active={isActive("/user_profile")}
                />
                <SidebarLink
                    to=""
                    icon="/public/images/noti.png"
                    label="Thông báo của tôi"
                    active={isActive("/notifications")}
                />
                <SidebarLink
                    to="/orders"
                    icon="/public/images/order.png"
                    label="Quản lý đơn hàng"
                    active={isActive("/orders")}
                />
            </div>
        </div>
    );
};

const SidebarLink = ({
    to,
    icon,
    label,
    active,
}: {
    to: string;
    icon: string;
    label: string;
    active: boolean;
}) => (
    <Link to={to}>
        <div
            className={`inline-flex items-center gap-3 text-sm px-2 py-2 rounded-lg w-fit ${
                active ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
            }`}
        >
            <img src={icon} alt={label} className="w-7 h-7" />
            <p>{label}</p>
        </div>
    </Link>
);

export default SidebarProfile;