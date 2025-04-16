import React, { useState, useEffect } from "react";
import { FaSearch, FaSort, FaEdit, FaSave } from "react-icons/fa";
import orderService from "../../../api/order.service";
import userService from "../../../api/user.service";
import { Order } from "../../../../interfaces";

const OrderManagement = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<{ [key: number]: string }>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: "asc" | "desc" } | null>(null);
    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const [newStatus, setNewStatus] = useState<Order['status']>("pending");

    const statusColors: Record<Order['status'], string> = {
        pending: "bg-yellow-400",
        processing: "bg-blue-500",
        shipping: "bg-purple-500",
        delivered: "bg-green-500",
        cancelled: "bg-red-500",
    };

    useEffect(() => {
        // Fetch orders and users
        const fetchOrdersAndUsers = async () => {
            try {
                const ordersData = await orderService.getOrders();
                const usersData = await userService.getAllUsers();
                const userMap = usersData.reduce((acc, user) => {
                    acc[user.id] = user.name;
                    return acc;
                }, {} as { [key: number]: string });

                setUsers(userMap);
                setOrders(ordersData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchOrdersAndUsers();
    }, []);

    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedOrders = [...orders].sort((a, b) => {
            if (key === "total") {
                return direction === "asc" ? a.total_amount - b.total_amount : b.total_amount - a.total_amount;
            } else {
                return direction === "asc"
                    ? String(a[key as keyof Order]).localeCompare(String(b[key as keyof Order]))
                    : String(b[key as keyof Order]).localeCompare(String(a[key as keyof Order]));
            }
        });

        setOrders(sortedOrders);
        setSortConfig({ key, direction });
    };

    const handleStartEdit = (orderId: string, currentStatus: Order['status']) => {
        setEditingOrderId(orderId);
        setNewStatus(currentStatus);
    };

    const handleSaveStatus = async () => {
        if (editingOrderId !== null) {
            await orderService.updateOrderStatus(editingOrderId, newStatus);
            const currentTimeISO = new Date().toISOString();
            const updatedOrders = orders.map((order) => {
                if (order.id === editingOrderId) {
                    return {
                        ...order,
                        status: newStatus,
                        updated_at: currentTimeISO
                    };
                }
                return order;
            });
            setOrders(updatedOrders);
            setEditingOrderId(null);
        }
    };

    return (
        <div className="p-6 mt-10 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-center">📦 Quản lý Đơn Hàng</h2>

            {/* Tìm kiếm */}
            <div className="relative w-1/3 mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm đơn hàng..."
                    className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 text-white"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Bảng đơn hàng */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                        <tr className="text-center">
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>ID <FaSort className="inline" /></th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("customer")}>Khách hàng <FaSort className="inline" /></th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("total")}>Tổng tiền <FaSort className="inline" /></th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("status")}>Trạng thái <FaSort className="inline" /></th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("created_at")}>Tạo lúc <FaSort className="inline" /></th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("updated_at")}>Cập nhật lúc <FaSort className="inline" /></th>
                            <th className="px-4 py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-200">
                        {orders
                            .filter(order => {
                                const userName = users[order.user_id];
                                return userName && userName.toLowerCase().includes(searchTerm.toLowerCase());
                            })
                            .map((order) => (
                                <tr key={order.id} className="text-center border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-4 py-3">{order.id}</td>
                                    <td className="px-4 py-3">{users[order.user_id]}</td>
                                    <td className="px-4 py-3">{order.total_amount.toLocaleString()}đ</td>
                                    <td className="px-4 py-3">
                                        {editingOrderId === order.id ? (
                                            <select
                                                title="Status"
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value as Order['status'])}
                                                className="px-3 py-2 rounded-md bg-gray-700 text-white border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                            >
                                                <option value="pending">🕒 Pending</option>
                                                <option value="processing">🔧 Processing</option>
                                                <option value="shipping">🚚 Shipping</option>
                                                <option value="delivered">✅ Delivered</option>
                                                <option value="cancelled">❌ Cancelled</option>
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[order.status]}`}>
                                                {order.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{order.created_at ? new Date(order.created_at).toLocaleString('vi-VN') : 'N/A'}</td>
                                    <td className="px-4 py-3">{order.updated_at ? new Date(order.updated_at).toLocaleString('vi-VN') : 'Chưa cập nhật'}</td>
                                    <td className="px-4 py-3 flex justify-center items-center gap-2 flex-wrap">
                                        {editingOrderId === order.id ? (
                                            <button
                                                onClick={handleSaveStatus}
                                                className="bg-emerald-500 px-3 py-2 rounded-md hover:bg-emerald-600 transition-all flex items-center gap-1 text-sm"
                                            >
                                                <FaSave /> Lưu
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleStartEdit(order.id, order.status)}
                                                className="bg-yellow-400 text-black px-3 py-2 rounded-md hover:bg-yellow-500 transition-all flex items-center gap-1 text-sm"
                                            >
                                                <FaEdit /> Cập nhật
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
