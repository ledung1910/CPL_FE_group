import React, { useState } from "react";


const OrderManagement = () => {
    const [orders, setOrders] = useState([
        { id: 101, customer: "Nguyễn Văn A", total: "500.000đ", status: "Đang xử lý" },
        { id: 102, customer: "Trần Thị B", total: "750.000đ", status: "Hoàn thành" },
        { id: 103, customer: "Lê Văn C", total: "1.200.000đ", status: "Đang giao" },
    ]);

    return (
        <div className="p-6 mt-10">
            <h2 className="text-xl font-bold mb-4">Quản lý Đơn Hàng</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Khách hàng</th>
                        <th className="border border-gray-300 px-4 py-2">Tổng tiền</th>
                        <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                        <th className="border border-gray-300 px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="text-center border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.customer}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.total}</td>
                            <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2">Chi tiết</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Hủy</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const ManagementPage = () => {
    return (
        <div>
            <OrderManagement />
        </div>
    );
};

export default ManagementPage;
