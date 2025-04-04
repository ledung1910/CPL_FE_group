import React from "react";
import { FaUser, FaBell, FaBox, FaExchangeAlt, FaMapMarkerAlt, FaCreditCard, FaStar, FaEye, FaHeart, FaCommentDots, FaShareAlt, FaShieldAlt, FaTag, FaLock, FaEnvelope, FaPhone, FaFacebook, FaGoogle } from "react-icons/fa";

const UserProfile = () => {
  return (
    <div className="flex justify-center bg-gray-100 w-[1240px] h-[751px] mx-auto py-10">
      {/* Sidebar */}
      <div className=" p-6 rounded-lg  w-1/4 h-full flex flex-col  text-xs flex-shrink-0 overflow-y-auto">
        <h2 className="text-sm font-semibold text-gray-800 mb-4">Tài khoản của</h2>
        <p className="text-base font-bold text-gray-900 mb-4">Tài khoản Google</p>
        <ul className="space-y-1 flex-1 text-gray-700">
          <li className="flex items-center font-medium bg-gray-200 p-2 rounded text-blue-600">
            <FaUser className="mr-2" /> Thông tin tài khoản
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaBell className="mr-2" /> Thông báo của tôi
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaBox className="mr-2" /> Quản lý đơn hàng
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaExchangeAlt className="mr-2" /> Quản lý đổi trả
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaMapMarkerAlt className="mr-2" /> Số địa chỉ
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaCreditCard className="mr-2" /> Thông tin thanh toán
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaStar className="mr-2" /> Đánh giá sản phẩm
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaEye className="mr-2" /> Sản phẩm bạn đã xem
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaHeart className="mr-2" /> Sản phẩm yêu thích
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaCommentDots className="mr-2" /> Nhận xét của tôi
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaShareAlt className="mr-2" /> Chia sẻ có lời
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaShieldAlt className="mr-2" /> Hợp đồng bảo hiểm
          </li>
          <li className="flex items-center p-2 hover:bg-gray-200 rounded">
            <FaTag className="mr-2" /> Mã giảm giá
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
