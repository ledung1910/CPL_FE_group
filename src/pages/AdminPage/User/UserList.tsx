import React, { useEffect, useState } from "react";
import { FaTrash, FaSearch, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface IUser {
    id: number;
    email: string;
    password: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof IUser; direction: "asc" | "desc" } | null>(null);

    useEffect(() => {
        fetch("/api.json")
            .then((res) => res.json())
            .then((data) => {
                console.log("API Data:", data);
                setUsers(data.users || []);
            })
            .catch((err) => console.error("Lỗi API:", err));
    }, []);

    const deleteUser = (id: number) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // Lọc danh sách theo từ khóa tìm kiếm
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Hàm sắp xếp
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig) return 0;

        const { key, direction } = sortConfig;
        const order = direction === "asc" ? 1 : -1;

        if (typeof a[key] === "number" && typeof b[key] === "number") {
            return order * ((a[key] as number) - (b[key] as number));
        } else {
            return order * String(a[key]).localeCompare(String(b[key]));
        }
    });

    // Thay đổi trạng thái sắp xếp
    const handleSort = (key: keyof IUser) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Biểu tượng sắp xếp
    const getSortIcon = (key: keyof IUser) => {
        if (!sortConfig || sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    };

    return (
        <div className="p-6 mt-10 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-center">👤 Quản lý Người Dùng</h2>

            {/* Thanh tìm kiếm */}
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
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("email")}>
                                Email {getSortIcon("email")}
                            </th>
                            <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("password")}>
                                Mật khẩu {getSortIcon("password")}
                            </th>
                            <th className="px-4 py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-200">
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <tr key={user.id} className="text-center border-b border-gray-700">
                                    <td className="px-4 py-3">{user.id}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.password}</td>
                                    <td className="px-4 py-3">
                                        <button 
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md flex items-center gap-2"
                                            onClick={() => deleteUser(user.id)}
                                        >
                                            <FaTrash /> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-4 py-3 text-center text-gray-400">Không có dữ liệu</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
