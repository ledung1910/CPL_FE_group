import React, { useEffect, useState } from "react";
import SidebarProfile from "../../shared/component/SideBarProfile";
import { useAuth } from "../../context/AuthContext";
import userService from '../../api/user.service';

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      district: "",
      city: "",
    },
  });

  const [editAddress, setEditAddress] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          district: user.address?.district || "",
          city: user.address?.city || "",
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const updatedUser = await userService.updateUser(user.id, {
        address: formData.address,
      });

      console.log("Cập nhật thành công:", updatedUser);
      setUser(updatedUser);
      setEditAddress(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Đã có lỗi xảy ra khi cập nhật!");
    }
  };

  const handleCancel = () => {
    // Khôi phục lại địa chỉ từ user
    if (user) {
      setFormData((prev) => ({
        ...prev,
        address: {
          street: user.address?.street || "",
          district: user.address?.district || "",
          city: user.address?.city || "",
        },
      }));
    }
    setEditAddress(false);
  };

  return (
    <div className="bg-[#F5F5FA] p-5 pl-15 pr-15 flex flex-col md:flex-row gap-5">

      <SidebarProfile />

      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-6">Thông tin tài khoản</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                readOnly
                className="w-full border rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
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

            {/* Địa chỉ */}
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Địa chỉ</h3>
                {!editAddress && (
                  <button
                    onClick={() => setEditAddress(true)}
                    className="bg-amber-400 px-4 py-2 rounded hover:bg-amber-500"
                  >
                    Chỉnh sửa
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 mt-3">
                <div>
                  <label className="block mb-1 font-medium">Đường</label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    readOnly={!editAddress}
                    className={`w-full border rounded px-4 py-2 ${!editAddress ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Quận/Huyện</label>
                  <input
                    type="text"
                    name="address.district"
                    value={formData.address.district}
                    onChange={handleChange}
                    readOnly={!editAddress}
                    className={`w-full border rounded px-4 py-2 ${!editAddress ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Thành phố</label>
                  <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    readOnly={!editAddress}
                    className={`w-full border rounded px-4 py-2 ${!editAddress ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  />
                </div>

                {editAddress && (
                  <div className="flex gap-3 mt-3">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Cập nhật
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Hủy
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
