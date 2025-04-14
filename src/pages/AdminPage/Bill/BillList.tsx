import React, { useState } from "react";
import { FaInfoCircle, FaTimes, FaSearch, FaSort, FaEdit, FaSave } from "react-icons/fa";

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
    id: number;
    customer: string;
    total: number;
    status: OrderStatus;
}

const OrderManagement = () => {
    const [orders, setOrders] = useState<Order[]>([
        { id: 101, customer: "Nguyễn Văn A", total: 500000, status: "pending" },
        { id: 102, customer: "Trần Thị B", total: 750000, status: "processing" },
        { id: 103, customer: "Lê Văn C", total: 1200000, status: "shipped" },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: "asc" | "desc" } | null>(null);
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [newStatus, setNewStatus] = useState<OrderStatus>("pending");

    const statusColors: Record<OrderStatus, string> = {
        pending: "bg-yellow-400",
        processing: "bg-blue-500",
        shipped: "bg-purple-500",
        delivered: "bg-green-500",
        cancelled: "bg-red-500",
    };

    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sortedOrders = [...orders].sort((a, b) => {
            if (key === "total") {
                return direction === "asc" ? a.total - b.total : b.total - a.total;
            } else {
                return direction === "asc"
                    ? String(a[key as keyof Order]).localeCompare(String(b[key as keyof Order]))
                    : String(b[key as keyof Order]).localeCompare(String(a[key as keyof Order]));
            }
        });

        setOrders(sortedOrders);
        setSortConfig({ key, direction });
    };

    const handleStartEdit = (orderId: number, currentStatus: OrderStatus) => {
        setEditingOrderId(orderId);
        setNewStatus(currentStatus);
    };

    const handleSaveStatus = () => {
        if (editingOrderId !== null) {
            const updated = orders.map(order =>
                order.id === editingOrderId ? { ...order, status: newStatus } : order
            );
            setOrders(updated);
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
                            <th className="px-4 py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-200">
                        {orders
                            .filter(order => order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((order) => (
                                <tr key={order.id} className="text-center border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-4 py-3">{order.id}</td>
                                    <td className="px-4 py-3">{order.customer}</td>
                                    <td className="px-4 py-3">{order.total.toLocaleString()}đ</td>
                                    <td className="px-4 py-3">
                                        {editingOrderId === order.id ? (
                                            <select
                                                title="Status"
                                                value={newStatus}
                                                onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                                                className="px-3 py-2 rounded-md bg-gray-700 text-white border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                            >
                                                <option value="pending">🕒 Pending</option>
                                                <option value="processing">🔧 Processing</option>
                                                <option value="shipped">🚚 Shipped</option>
                                                <option value="delivered">✅ Delivered</option>
                                                <option value="cancelled">❌ Cancelled</option>
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColors[order.status]}`}>
                                                {order.status}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-4 py-3 flex justify-center items-center gap-2 flex-wrap">
                                        <button className="bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-600 transition-all flex items-center gap-1 text-sm">
                                            <FaInfoCircle /> Chi tiết
                                        </button>
                                        <button className="bg-red-500 px-3 py-2 rounded-md hover:bg-red-600 transition-all flex items-center gap-1 text-sm">
                                            <FaTimes /> Hủy
                                        </button>
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
