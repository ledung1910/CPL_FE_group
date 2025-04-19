import React, { useEffect, useState } from "react";
import SidebarProfile from "../../../shared/component/Sidebar/SideBarProfile";
import { useAuth } from "../../../context/AuthContext";
import orderService from "../../../api/order.service";
import { Order } from "../../../../interfaces";
import { useNavigate } from 'react-router-dom';

const statusLabels: Record<Order['status'], string> = {
    pending: 'Đang chờ giải quyết',
    processing: 'Đang xử lý',
    shipping: 'Đang vận chuyển',
    delivered: 'Đã giao',
    cancelled: 'Đã huỷ'
};
const statusColors: Record<Order['status'], string> = {
    pending: "bg-yellow-400",
    processing: "bg-blue-500",
    shipping: "bg-purple-500",
    delivered: "bg-green-500",
    cancelled: "bg-red-500",
};

const UserOrdersPage: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                if (user?.id) {
                    const fetchedOrders = await orderService.getOrdersByUser(user.id);
                    setOrders(fetchedOrders);
                } else {
                    setError("Không tìm thấy thông tin người dùng.");
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || "Lỗi khi tải đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, [user?.id]);

    const handleViewDetails = (orderId: string) => {
        console.log("Navigating to order:", orderId);
        navigate(`/orders/${orderId}`);
    };

    if (loading) {
        return <div>Đang tải đơn hàng...</div>;
    }

    if (error) {
        return <div className="text-red-500">Lỗi: {error}</div>;
    }

    return (
        <div className="bg-[#F5F5FA] p-5 md:pl-15 md:pr-15 flex flex-col md:flex-row gap-4">
            <SidebarProfile />
            <div className="w-full md:w-4/5 rounded-xl bg-gray-800 p-6 shadow-md min-h-150">
                <h2 className="text-xl font-semibold mb-4 text-white">Đơn hàng của bạn</h2>
                {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="border-collapse shadow-lg rounded-lg bg-gray-300 overflow-hidden  w-full text-sm sm:text-base">
                            <thead className="bg-gray-500 text-white">
                                <tr className="text-center">
                                    <th className="py-2 px-4 border-b">Mã đơn hàng</th>
                                    <th className="py-2 px-4 border-b hidden md:table-cell">Ngày đặt hàng</th>
                                    <th className="py-2 px-4 border-b">Tổng tiền</th>
                                    <th className="py-2 px-4 border-b hidden md:table-cell">Trạng thái</th>
                                    <th className="py-2 px-4 border-b">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-200">
                                        <td className="py-2 px-4 text-center border-b">{order.id}</td>
                                        <td className="py-2 px-4 text-center border-b hidden md:table-cell">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4 text-center border-b">{order.total_amount.toLocaleString()} VNĐ</td>
                                        <td className="py-2 px-4 text-center border-b hidden md:table-cell">
                                            <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[order.status]}`}>
                                                {statusLabels[order.status] || order.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 text-center border-b">
                                            <button onClick={() => handleViewDetails(order.id)} className="py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600">
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Bạn chưa có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
};

export default UserOrdersPage;