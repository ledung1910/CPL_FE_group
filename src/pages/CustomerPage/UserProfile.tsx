import React, { useState } from "react";
import { User, Bell, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Address {
  street: string;
  city: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  orders?: any[];
}

const mockUser: UserData = {
  id: "1",
  name: "Vũ Anh Tú",
  email: "tommap23@gmail.com",
  phone: "0976868720",
  address: {
    street: "123 Đường ABC",
    city: "Hà Nội",
  },
};

const UserProfile = () => {
  const [phone, setPhone] = useState(mockUser.phone || "");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSave = () => {
    // Gọi API hoặc cập nhật dữ liệu ở đây
    alert(`Số điện thoại mới: ${phone}`);
  };

  return (
    <div className="flex justify-center bg-gray-100 w-[1240px] mx-auto py-10">
      {/* Sidebar */}
      <div className="w-1/4 rounded-xl">
        <p className="text-gray-500 text-l">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          &nbsp;&gt;&nbsp;
          <span className="font-bold text-black">Tài khoản</span>
        </p>
        <div className="flex items-center pb-4 mt-3">
          <div className="w-13 h-13 bg-gray-300 rounded-full mb-2 mr-3 mt-2"></div>
          <div className="flex-col">
            <p className="text-gray-500">Tài khoản của</p>
            <p className="font-semibold text-lg">{mockUser.name}</p>
          </div>
        </div>
        <div className="space-y-4">
          <Link to="/user_profile">
            <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
              <User size={20} />
              <p>Thông tin tài khoản</p>
            </div>
          </Link>
          <div className="flex items-center gap-3 mt-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <Bell size={20} />
            <p>Thông báo của tôi</p>
          </div>
          <div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <BookOpen size={20} />
            <p>Quản lý đơn hàng</p>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="bg-white p-6 rounded-lg shadow w-3/4 flex h-full ml-6">
        <div className="w-full">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Thông tin tài khoản</h2>

          {/* Họ và tên */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Họ và tên</label>
            <input
              className="border p-2 rounded w-full text-sm bg-gray-100"
              value={mockUser.name}
              disabled
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              className="border p-2 rounded w-full text-sm bg-gray-100"
              value={mockUser.email}
              disabled
            />
          </div>

          {/* Số điện thoại - cho phép chỉnh sửa */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Số điện thoại</label>
            <input
              className="border p-2 rounded w-full text-sm"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>

          {/* Địa chỉ */}
          {mockUser.address && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">Địa chỉ</label>
              <input
                className="border p-2 rounded w-full text-sm bg-gray-100"
                value={`${mockUser.address.street}, ${mockUser.address.city}`}
                disabled
              />
            </div>
          )}

          {/* Save button */}
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600"
            onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
