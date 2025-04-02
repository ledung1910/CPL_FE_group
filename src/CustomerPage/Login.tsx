import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const [isEmailLogin, setIsEmailLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black/30 pt-20">
            <button
                className="relative top-[-15px] right-[-765px] bg-white rounded-full p-2 shadow-lg z-10 flex items-center justify-center"
                onClick={onClose}
                title="Đóng"
            >
                <svg
                    className="w-8 h-8 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    role="img"
                    aria-label="Đóng"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <div
                className={`bg-white w-[750px] md:w-[750px] flex rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 ${isEmailLogin ? "h-[430px]" : "h-[520px]"
                    }`}
            >
                {/* Đăng nhập chính */}
                {!isEmailLogin ? (
                    <div className="w-2/3 p-6">
                        <h2 className="text-xl font-semibold ml-3">Xin chào,</h2>
                        <p className="text-black ml-3">Đăng nhập hoặc Tạo tài khoản</p>

                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            className="w-full mt-4 p-2 ml-3 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-2xl text-gray-500 placeholder-gray-400"
                        />

                        <button className="mt-6 p-3 ml-3 pr-45 pl-45 bg-red-500 text-white text-xl rounded-lg hover:bg-red-600">
                            Tiếp Tục
                        </button>

                        {/* Chuyển sang đăng nhập bằng email */}
                        <a
                            href="#"
                            className="block text-blue-800 text-center mt-3"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEmailLogin(true);
                            }}
                        >
                            Đăng nhập bằng email
                        </a>

                        <div className="flex items-center mt-25 mb-0 ml-3">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-3 text-gray-500">Hoặc tiếp tục bằng</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Social Login */}
                        <div className="flex justify-center gap-4">
                            <button
                                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                                title="Đăng nhập bằng Facebook"
                                aria-label="Đăng nhập bằng Facebook"
                            >
                                <FaFacebook size={24} />
                            </button>
                            <button
                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
                                title="Đăng nhập bằng Google"
                                aria-label="Đăng nhập bằng Google"
                            >
                                <FaGoogle size={24} />
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mt-4 text-left ml-4">
                            Bằng việc tiếp tục, bạn đã đọc và đồng ý với
                            <a href="#" className="text-gray-500 underline"> điều khoản sử dụng</a> và
                            <br />
                            <a href="#" className="text-gray-500 underline"> Chính sách bảo mật thông tin cá nhân</a> của Tiki
                        </p>
                    </div>
                ) : (
                    // Đăng nhập bằng Email
                    <div className="w-full max-w-md mx-auto p-6">
                        {/* Nút quay lại */}
                        <button
                            type="button"
                            onClick={() => setIsEmailLogin(false)}
                            className="text-gray-500 mb-4"
                            aria-label="Quay lại trang trước"
                            title="Quay lại"
                        >
                            <ArrowLeft size={24} />
                        </button>

                        <h2 className="text-2xl font-semibold">Đăng nhập bằng email</h2>
                        <p className="text-gray-500">Nhập email và mật khẩu tài khoản Tiki</p>

                        {/* Input Email */}
                        <input
                            type="email"
                            placeholder="acb@email.com"
                            className="w-full mt-4 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-l text-gray-500 placeholder-gray-400"
                        />

                        {/* Input Mật khẩu */}
                        <div className="relative mt-4">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500 text-l"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-2 text-blue-600"
                                title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? "Ẩn" : "Hiện"}
                            </button>
                        </div>

                        {/* Nút Đăng nhập */}
                        <button
                            type="submit"
                            className="w-full mt-9 p-3 bg-red-500 text-white text-xl rounded-lg hover:bg-red-600"
                        >
                            Đăng nhập
                        </button>

                        {/* Liên kết phụ */}
                        <div className="mt-7 text-left">
                            <a href="#" className="text-blue-600">Quên mật khẩu?</a>
                            <p className="mt-1 text-gray-500">
                                Chưa có tài khoản? <a href="#" className="text-blue-600">Tạo tài khoản</a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Right side - Image and text */}
                <div className="w-1/3 bg-blue-100 flex flex-col items-center justify-center text-center p-4">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
                        alt="Tiki Bot"
                        className="w-50 h-50 mb-3"
                    />
                    <p className="text-blue-600 font-semibold">Mua sắm tại Tiki</p>
                    <p className="text-blue-600 text-sm">Siêu ưu đãi mỗi ngày</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
