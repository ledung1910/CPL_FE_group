import React, { useState } from "react";
import { FaInfoCircle, FaTimes, FaSearch, FaSort } from "react-icons/fa";

const OrderManagement = () => {
    const [orders, setOrders] = useState([
        { id: 101, customer: "Nguyễn Văn A", total: 500000, status: "Đang xử lý" },
        { id: 102, customer: "Trần Thị B", total: 750000, status: "Hoàn thành" },
        { id: 103, customer: "Lê Văn C", total: 1200000, status: "Đang giao" },
    ]);
    
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: "asc" | "desc" } | null>(null);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Đang xử lý": return "bg-yellow-400";
            case "Hoàn thành": return "bg-green-500";
            case "Đang giao": return "bg-blue-500";
            default: return "bg-gray-500";
        }
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
                    ? String(a[key as keyof typeof a]).localeCompare(String(b[key as keyof typeof b]))
                    : String(b[key as keyof typeof b]).localeCompare(String(a[key as keyof typeof a]));
            }
        });
        

        setOrders(sortedOrders);
        setSortConfig({ key, direction });
    };

    return (
        <div className="p-6 mt-10 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-center">📦 Quản lý Đơn Hàng</h2>

            {/* Thanh tìm kiếm */}
            <div className="relative w-1/3 mb-4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm đơn hàng..."
                    className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 text-white focus:ring focus:ring-blue-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Bảng đơn hàng */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                        <tr className="text-center">
                            <th className="px-4 py-3 cursor-pointer hover:bg-gray-600" onClick={() => handleSort("id")}>
                                ID <FaSort className="inline" />
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-gray-600" onClick={() => handleSort("customer")}>
                                Khách hàng <FaSort className="inline" />
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-gray-600" onClick={() => handleSort("total")}>
                                Tổng tiền <FaSort className="inline" />
                            </th>
                            <th className="px-4 py-3 cursor-pointer hover:bg-gray-600" onClick={() => handleSort("status")}>
                                Trạng thái <FaSort className="inline" />
                            </th>
                            <th className="px-4 py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-200">
                        {orders
                            .filter(order => order.customer.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((order) => (
                                <tr key={order.id} className="text-center border-b border-gray-700 hover:bg-gray-700 transition-all">
                                    <td className="px-4 py-3">{order.id}</td>
                                    <td className="px-4 py-3">{order.customer}</td>
                                    <td className="px-4 py-3">{order.total.toLocaleString()}đ</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 flex justify-center gap-3">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all shadow-md flex items-center gap-2">
                                            <FaInfoCircle /> Chi tiết
                                        </button>
                                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md flex items-center gap-2">
                                            <FaTimes /> Hủy
                                        </button>
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
