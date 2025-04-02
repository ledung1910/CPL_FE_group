import React, { useEffect, useState } from "react";

interface IUser {
    id: number;
    email: string;
    password: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<IUser[]>([]);

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

    return (
        <div className="p-6 mt-10">
            <h2 className="text-xl font-bold mb-4">Quản lý Người Dùng</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Password</th>
                        <th className="border border-gray-300 px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id} className="text-center border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button 
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center">Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;