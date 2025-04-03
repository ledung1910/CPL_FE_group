import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaPlus, FaSearch } from "react-icons/fa";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: "Sách tiếng Việt" },
        { id: 2, name: "Sách ngoại văn" },
        { id: 3, name: "Truyện tranh" },
    ]);
    const [newCategory, setNewCategory] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    const addOrUpdateCategory = () => {
        if (newCategory.trim() === "") return;

        if (editingId !== null) {
            // Cập nhật danh mục nếu đang chỉnh sửa
            setCategories(categories.map(cat => 
                cat.id === editingId ? { ...cat, name: newCategory } : cat
            ));
            setEditingId(null);
        } else {
            // Thêm danh mục mới
            const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
            setCategories([...categories, { id: newId, name: newCategory }]);
        }

        setNewCategory("");
    };

    const editCategory = (categoryId: number) => {
        const category = categories.find(cat => cat.id === categoryId);
        if (category) {
            setNewCategory(category.name);
            setEditingId(categoryId);
        }
    };
    const handleSort = (option: string) => {
        let sortedCategories = [...categories];
    
        switch (option) {
            case "id_asc":
                sortedCategories.sort((a, b) => a.id - b.id);
                break;
            case "id_desc":
                sortedCategories.sort((a, b) => b.id - a.id);
                break;
            case "name_asc":
                sortedCategories.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name_desc":
                sortedCategories.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
    
        setCategories(sortedCategories);
    };
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-center">📂 Quản lý Danh Mục</h2>
            <div className="flex justify-between items-center mb-4">
                <div className="relative w-1/3">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="🔍 Tìm kiếm..."
                        className="pl-10 pr-4 py-2 w-full rounded-lg bg-gray-800 text-white"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                    onChange={(e) => handleSort(e.target.value)}
                >
                    <option value="">🔽 Sắp xếp...</option>
                    <option value="id_asc">📌 ID Tăng</option>
                    <option value="id_desc">📌 ID Giảm</option>
                    <option value="name_asc">📧 A-Z</option>
                    <option value="name_desc">📧 Z-A</option>
                </select>
            </div>
            {/* Input thêm/chỉnh sửa danh mục */}
            <div className="mb-6 flex gap-3 items-center">
                <input
                    type="text"
                    className="border border-gray-600 px-3 py-2 rounded-md bg-gray-800 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên danh mục..."
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                    className={`px-5 py-2 rounded-lg transition-all shadow-md flex items-center gap-2 ${
                        editingId !== null 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={addOrUpdateCategory}
                >
                    {editingId !== null ? <FaSave /> : <FaPlus/>} {editingId !== null ? "Lưu" : "Add"}
                </button>
            </div>

            {/* Bảng danh mục */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                        <tr className="text-center">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Tên danh mục</th>
                            <th className="px-4 py-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 text-gray-200">
                        {categories.map((category) => (
                            <tr key={category.id} className="text-center border-b border-gray-700">
                                <td className="px-4 py-3">{category.id}</td>
                                <td className="px-4 py-3">{category.name}</td>
                                <td className="px-4 py-3 flex justify-center gap-3">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all shadow-md flex items-center gap-2"
                                        onClick={() => editCategory(category.id)}
                                    >
                                        <FaEdit /> Sửa
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md flex items-center gap-2"
                                        onClick={() =>
                                            setCategories(categories.filter((c) => c.id !== category.id))
                                        }
                                    >
                                        <FaTrash /> Xóa
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

export default CategoryManagement;
