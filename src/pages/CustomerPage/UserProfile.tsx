import React, { useEffect, useState } from "react";
import SidebarProfile from "../../shared/component/SideBarProfile";
import { useAuth } from "../../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
    },
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
        },
      });
    }
  }, [user]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu gửi đi:", formData);
    // TODO: Gọi API cập nhật user ở đây
  };

  return (
    <div className="flex gap-6 px-32 py-8 bg-gray-50 min-h-screen">
      <SidebarProfile />

      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-6">Thông tin tài khoản</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Họ và tên</label>
              <input
                type="text"
                name="name"
                readOnly
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                readOnly
                className="w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>


            <div>
              <label className="block mb-1 font-medium">Địa chỉ - Đường</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Địa chỉ - Thành phố</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Địa chỉ - Tỉnh/Bang</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
