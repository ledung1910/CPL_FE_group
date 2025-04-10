import React from "react";
import { FaUser, FaBell, FaBox, FaExchangeAlt, FaMapMarkerAlt, FaCreditCard, FaStar, FaEye, FaHeart, FaCommentDots, FaShareAlt, FaShieldAlt, FaTag, FaLock, FaEnvelope, FaPhone, FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const UserProfile = () => {
  return (
    <div className="flex justify-center bg-gray-100 w-[1240px] h-[751px] mx-auto py-10">
      <div className="w-1/4 pr-4">

      {/* User Info */}
      <div className="flex items-center mb-6">
        <div className="w-[48px] h-[48px] bg-gray-300 rounded-full mr-3" />
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Tài khoản của</p>
          <p className="text-base font-semibold text-gray-800">Vũ Anh Tú</p>
        </div>
      </div>

      {/* Sidebar Menu */}
      <ul className="space-y-3 text-sm text-gray-700">
        <Link to="/user_profile">
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer transition text-blue-600 font-medium bg-gray-100">
            <FaUser size={16} />
            Thông tin tài khoản
          </li>
        </Link>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaBell size={16} />
          Thông báo của tôi
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaBox size={16} />
          Quản lý đơn hàng
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaExchangeAlt size={16} />
          Quản lý đổi trả
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaMapMarkerAlt size={16} />
          Sổ địa chỉ
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaCreditCard size={16} />
          Thông tin thanh toán
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaStar size={16} />
          Đánh giá sản phẩm
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaEye size={16} />
          Sản phẩm đã xem
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaHeart size={16} />
          Sản phẩm yêu thích
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaCommentDots size={16} />
          Nhận xét của tôi
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaShareAlt size={16} />
          Chia sẻ có lời
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaShieldAlt size={16} />
          Hợp đồng bảo hiểm
        </li>
        <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 cursor-pointer">
          <FaTag size={16} />
          Mã giảm giá
        </li>
      </ul>
    </div>
      
      {/* User Profile Form */}
      <div className="bg-white p-6 rounded-lg shadow w-3/4 flex h-full">
        {/* Left Section */}
        <div className="w-2/3 pr-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông tin tài khoản</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-blue-500 text-xl">
              👤
            </div>
            <div>
              <p className="text-base font-medium">Tài khoản Google</p>
              <input className="border p-2 rounded w-full mt-1 text-sm" placeholder="Thêm nickname" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 text-sm">Ngày sinh</label>
              <div className="flex space-x-1 mt-1">
                <select className="border p-2 rounded w-1/3 text-xs">
                  <option>Ngày</option>
                </select>
                <select className="border p-2 rounded w-1/3 text-xs">
                  <option>Tháng</option>
                </select>
                <select className="border p-2 rounded w-1/3 text-xs">
                  <option>Năm</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-gray-600 text-sm">Giới tính</label>
              <div className="flex space-x-2 mt-1">
                <label className="flex items-center text-xs">
                  <input type="radio" name="gender" className="mr-1" /> Nam
                </label>
                <label className="flex items-center text-xs">
                  <input type="radio" name="gender" className="mr-1" /> Nữ
                </label>
                <label className="flex items-center text-xs">
                  <input type="radio" name="gender" className="mr-1" /> Khác
                </label>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label className="text-gray-600 text-sm">Quốc tịch</label>
            <select className="border p-2 rounded w-full mt-1 text-xs">
              <option>Chọn quốc tịch</option>
            </select>
          </div>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-sm">Lưu thay đổi</button>
        </div>
        
        {/* Right Section */}
        <div className="w-1/3 pl-6 border-l">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Số điện thoại và Email</h2>
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><FaPhone className="mr-2" /> 0976868720</p>
            <button className="mt-1 text-blue-500 border px-3 py-1 rounded text-sm">Cập nhật</button>
          </div>
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><FaEnvelope className="mr-2" /> tommap23@gmail.com</p>
            <button className="mt-1 text-blue-500 border px-3 py-1 rounded text-sm">Cập nhật</button>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Bảo mật</h2>
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><FaLock className="mr-2" /> Thiết lập mật khẩu</p>
            <button className="mt-1 text-blue-500 border px-3 py-1 rounded text-sm">Cập nhật</button>
          </div>
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><FaShieldAlt className="mr-2" /> Thiết lập mã PIN</p>
            <button className="mt-1 text-blue-500 border px-3 py-1 rounded text-sm">Thiết lập</button>
          </div>
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><FaTag className="mr-2" /> Yêu cầu xóa tài khoản</p>
            <button className="mt-1 text-blue-500 border px-3 py-1 rounded text-sm">Yêu cầu</button>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Liên kết mạng xã hội</h2>
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><FaFacebook className="mr-2" /> Facebook</p>
            <button className="mt-1 text-blue-500 border px-3 py-1 rounded text-sm">Liên kết</button>
          </div>
          <div className="mb-4">
            <p className="flex items-center text-gray-700"><FaGoogle className="mr-2" /> Google</p>
            <button className="mt-1 bg-gray-300 text-gray-600 px-3 py-1 rounded text-sm">Đã liên kết</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
