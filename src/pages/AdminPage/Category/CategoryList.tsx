import React, { useState } from "react";

const CategoryManagement = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: "Sách tiếng Việt" },
        { id: 2, name: "Sách ngoại văn" },
        { id: 3, name: "Truyện tranh" },
    ]);
    const [newCategory, setNewCategory] = useState("");

    const addCategory = () => {
        if (newCategory.trim() === "") return;
        const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
        setCategories([...categories, { id: newId, name: newCategory }]);
        setNewCategory("");
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Quản lý Danh Mục</h2>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    className="border border-gray-300 px-3 py-2 rounded w-full"
                    placeholder="Nhập tên danh mục"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
                    onClick={addCategory}
                >
                    Thêm
                </button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Tên danh mục</th>
                        <th className="border border-gray-300 px-4 py-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="text-center border border-gray-300">
                            <td className="border border-gray-300 px-4 py-2">{category.id}</td>
                            <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryManagement;