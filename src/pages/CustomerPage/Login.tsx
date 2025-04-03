import React, { useState, useEffect } from 'react';
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import 'font-awesome/css/font-awesome.min.css';

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const [isEmailLogin, setIsEmailLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [isPasswordPopup, setIsPasswordPopup] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setIsEmailLogin(false);
            setShowPassword(false);
            setIsForgotPassword(false);
            setIsRegister(false);
            setIsPasswordPopup(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 flex items-start justify-center bg-black/30 pt-20 z-1000">
            <button
                className="relative top-[-15px] right-[-788px] bg-white rounded-full p-4 w-12 h-12 shadow-lg z-10 flex items-center justify-center"
                onClick={onClose}
                title="Đóng"
            >
                <i className="fa fa-times text-gray-500 text-3xl"></i>  
            </button>

            <div className={`bg-white w-[780px] rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300
            ${isPasswordPopup ? "h-[350px]" : isEmailLogin ? "h-[435px]" : isForgotPassword ? "h-[415px]" : "h-[520px]"}`}>
                <div className="flex w-full h-full">
                    {/* Left side - Form content */}
                    <div className="w-2/3 p-6">
                        {!isEmailLogin && !isForgotPassword && !isRegister && !isPasswordPopup ? (
                            <>
                                <h2 className="text-2xl font-semibold ml-3">Xin chào,</h2>
                                <p className="text-black mt-2 ml-3">Đăng nhập hoặc Tạo tài khoản</p>

                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    className="w-[450px] mt-4 p-2 ml-3 border-b border-gray-300 focus:outline-none focus:border-[#BDBCBC] text-2xl text-gray-500 placeholder-gray-400"
                                />

                                <div className="flex flex-col items-center">
                                    <button className="w-[450px] ml-[-1] mt-8 p-2.5 bg-red-500 text-white text-xl rounded-sm hover:bg-red-600">
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
                                </div>

                                <div className="flex items-center w-[450px] mt-18 mb-0 ml-3">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-3 text-gray-500">Hoặc tiếp tục bằng</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                {/* Social Login */}
                                <div className="flex justify-center gap-4 mt-3">
                                    <button
                                        className="p-3 bg-[#1877F2] text-white rounded-full hover:bg-[#165DCC] flex items-center justify-center"
                                        title="Đăng nhập bằng Facebook"
                                        aria-label="Đăng nhập bằng Facebook"
                                    >
                                        <FaFacebookF size={24} />
                                    </button>
                                    <button
                                        className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100 flex items-center justify-center"
                                        title="Đăng nhập bằng Google"
                                        aria-label="Đăng nhập bằng Google"
                                    >
                                        <FcGoogle size={24} />
                                    </button>
                                </div>

                                <p className="text-sm text-gray-500 mt-4 text-left ml-4">
                                    Bằng việc tiếp tục, bạn đã đọc và đồng ý với
                                    <a href="#" className="text-gray-500 underline"> điều khoản sử dụng</a> và
                                    <br />
                                    <a href="#" className="text-gray-500 underline"> Chính sách bảo mật thông tin cá nhân</a> của Tiki
                                </p>
                            </>
                        ) : isEmailLogin ? (
                            // Đăng nhập bằng Email
                            <div className="w-full max-w-md mx-auto p-6">
                                {/* Nút quay lại */}
                                <button type="button" onClick={() => {
                                    setIsEmailLogin(false);
                                    setIsForgotPassword(false);
                                    setIsRegister(false);
                                }} className="text-gray-500 mb-4">
                                    <ArrowLeft size={24} />
                                </button>

                                <h2 className="text-2xl font-semibold">Đăng nhập bằng email</h2>
                                <p className="text-gray-500">Nhập email và mật khẩu tài khoản Tiki</p>

                                {/* Input Email */}
                                <input
                                    type="email"
                                    placeholder="acb@email.com"
                                    className="w-full mt-4 p-2 border-b border-[#BDBCBC] focus:outline-none focus:border-gray-500 text-l text-gray-500 placeholder-gray-400"
                                />

                                {/* Input Mật khẩu */}
                                <div className="relative mt-4">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mật khẩu"
                                        className="w-full p-2 border-b border-[#BDBCBC]  text-gray-500 focus:outline-none focus:border-gray-500 text-l  placeholder-gray-400"
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
                                    className="w-full mt-9 p-2.5 bg-red-500 text-white text-xl rounded-sm hover:bg-red-600"
                                >
                                    Đăng nhập
                                </button>

                                {/* Liên kết phụ */}
                                <div className="mt-5 text-left text-sm">
                                    <div className="mt-4">
                                        <a href="#" className="text-blue-800" onClick={(e) => {
                                            e.preventDefault();
                                            setIsForgotPassword(true);
                                            setIsEmailLogin(false);
                                            setIsRegister(false);
                                        }}>
                                            Quên mật khẩu?
                                        </a>
                                    </div>
                                    <div className="flex">
                                        <p className="mt-1 text-gray-500 mr-3">Chưa có tài khoản? </p>
                                        <a href="#" className="text-blue-800 mt-1 " onClick={(e) => {
                                            e.preventDefault();
                                            setIsRegister(true);
                                            setIsEmailLogin(false);
                                            setIsForgotPassword(false);
                                        }}>
                                            Tạo tài khoản
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : isRegister ? (
                            <div className="w-full max-w-md mx-auto p-[-1]">
                                <button type="button" onClick={() => {
                                    setIsRegister(false);
                                    setIsEmailLogin(true);
                                    setIsForgotPassword(false);
                                }} className="text-gray-500 mb-4">
                                    <ArrowLeft size={24} />
                                </button>

                                <h2 className="text-2xl font-semibold">Tạo tài khoản</h2>
                                <p className="text-gray-500">Nhập số điện thoại để đăng ký</p>
                                <input type="tel" placeholder="Số điện thoại" className="w-full text-2xl mt-4 p-2 border-b border-[#BDBCBC] text-l text-gray-500 placeholder-gray-400" />
                                <button className="w-full mt-9 p-3 bg-red-500 text-white text-2xl rounded-sm hover:bg-red-600">Tiếp tục</button>

                                <div className="flex items-center mt-20 mb-0 ml-3">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-3 text-gray-500">Hoặc tiếp tục bằng</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                {/* Social Login */}
                                <div className="flex justify-center gap-4">
                                    <button
                                        className="p-3 bg-[#1877F2] text-white rounded-full hover:bg-[#165DCC] flex items-center justify-center"
                                        title="Đăng nhập bằng Facebook"
                                        aria-label="Đăng nhập bằng Facebook"
                                    >
                                        <FaFacebookF size={24} />
                                    </button>
                                    <button
                                        className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-100 flex items-center justify-center"
                                        title="Đăng nhập bằng Google"
                                        aria-label="Đăng nhập bằng Google"
                                    >
                                        <FcGoogle size={24} />
                                    </button>
                                </div>

                                <p className="text-sm text-gray-500 mt-4 text-left ml-4">
                                    Bằng việc tiếp tục, bạn đã đọc và đồng ý với
                                    <a href="#" className="text-gray-500 underline"> điều khoản sử dụng</a> và
                                    <br />
                                    <a href="#" className="text-gray-500 underline"> Chính sách bảo mật thông tin cá nhân</a> của Tiki
                                </p>

                            </div>
                        ) : isPasswordPopup ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPasswordPopup(false);
                                        setIsEmailLogin(false);
                                        setIsForgotPassword(false);
                                        setIsRegister(false);
                                    }}
                                    className="text-gray-500 mb-4"
                                >
                                    <ArrowLeft size={24} />
                                </button>

                                <h2 className="text-2xl mt-10 ml-5 font-semibold">Nhập mật khẩu</h2>
                                {/* Ô nhập mật khẩu */}
                                <div className="relative mt-4 ml-5">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mật khẩu"
                                        className="w-full p-2 border-b border-gray-300 text-gray-500"
                                    />
                                </div>

                                {/* Nút Đăng nhập */}
                                <div className="flex flex-col items-center">
                                    <button className="w-[450px] ml-5 mt-6 p-2.5 bg-red-500 text-white text-xl rounded-sm hover:bg-red-600">
                                        Đăng Nhập
                                    </button>

                                    <a href="#" className="text-blue-800 ml-5 self-start mt-5 " onClick={(e) => {
                                        e.preventDefault();
                                        setIsForgotPassword(true);
                                        setIsPasswordPopup(false);
                                    }}>
                                        Quên mật khẩu?
                                    </a>
                                </div>
                            </>
                        ) : (
                            // Form Quên Mật Khẩu
                            <div className="w-full max-w-md mx-auto p-6">
                                <button type="button" onClick={() => {
                                    setIsForgotPassword(false);
                                    setIsPasswordPopup(true);
                                }} className="text-gray-500 mb-4">
                                    <ArrowLeft size={24} />
                                </button>

                                <h2 className="text-2xl font-semibold">Quên mật khẩu ?</h2>
                                <p className="text-black mt-4 ">Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu</p>
                                <input type="email" placeholder="Số điện thoại/Email" className="w-full mt-4 p-2 text-2xl border-b text-[#BDBCBC] focus:outline-none focus:border-[#BDBCBC]" />
                                <button className="w-full mt-15 p-2.5 bg-red-500 text-white text-xl rounded-ssm hover:bg-red-600">Lấy lại mật khẩu</button>
                                <p className="mt-4 text-blue-800 text-sm">
                                    Đổi số điện thoại? Liên hệ Hotline 1900-6035
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right side - Image and text */}
                    <div className="w-1/3 bg-blue-100 flex flex-col items-center justify-center text-center p-4">
                        <img
                            src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
                            alt="Tiki Bot"
                            className="w-50 h-50 mb-3"
                        />
                        <p className="text-blue-600 font-semibold mt-3 text-xl">Mua sắm tại Tiki</p>
                        <p className="text-blue-600 text-l">Siêu ưu đãi mỗi ngày</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;
