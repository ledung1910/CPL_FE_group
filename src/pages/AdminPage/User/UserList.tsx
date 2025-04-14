import React, { useState, useEffect } from "react";
import { FaBan, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface Address {
    street: string;
    city: string;
    state: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: Address;
    orders?: any[]; // Nếu có thêm dữ liệu về đơn hàng
}

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: "asc" | "desc" } | null>(null);

    useEffect(() => {
        // Lấy dữ liệu người dùng từ API khi component được mount
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api.json"); // Chỉnh URL API cho phù hợp
                const data = await response.json();
                setUsers(data.users || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const deleteUser = (id: string) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const order = direction === "asc" ? 1 : -1;
        return order * String(a[key] ?? "").localeCompare(String(b[key] ?? ""));
    });

    const handleSort = (key: keyof User) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: keyof User) => {
        if (!sortConfig || sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="p-6 mt-10 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-center">👤 Quản lý Người Dùng</h2>

            <div className="mb-4 flex items-center gap-2 bg-gray-800 p-3 rounded-md shadow-md">
                <FaSearch className="text-gray-400" />
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm theo email..."
                    className="w-full bg-transparent text-white outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                        <tr className="text-center">
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                                ID {getSortIcon("id")}
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>
                                Tên {getSortIcon("name")}
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("email")}>
                                Email {getSortIcon("email")}
                            </th>
                            <th className="px-4 py-3">SĐT</th>
                            <th className="px-4 py-3">Địa chỉ</th>
                            <th className="px-4 py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-200">
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <tr key={user.id} className="text-center border-b border-gray-700">
                                    <td className="px-4 py-3">{user.id}</td>
                                    <td className="px-4 py-3">{user.name}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.phone || "—"}</td>
                                    <td className="px-4 py-3">
                                        {user.address
                                            ? `${user.address.street ?? ""}, ${user.address.city ?? ""}, ${user.address.state ?? ""}`
                                            : "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all shadow-md flex items-center gap-2"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            <FaBan /> Ban
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-4 py-3 text-center text-gray-400">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
