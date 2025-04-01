import React from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
            <button
                className="relative top-[-240px] right-[-820px] bg-white rounded-full p-4 shadow-lg z-10"
                onClick={onClose}
                style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
            >
                ✖
            </button>

            <div className="bg-white w-[700px] md:w-[800px] h-[550px] md:h-[500px] flex rounded-2xl shadow-lg relative overflow-hidden">

                <div className="w-2/3 p-6">
                    <h2 className="text-xl font-semibold">Xin chào,</h2>
                    <p className="text-gray-600">Đăng nhập hoặc Tạo tài khoản</p>

                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button className="w-full mt-4 p-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
                        Tiếp Tục
                    </button>
                    <a href="#" className="block text-blue-500 text-center mt-3">Đăng nhập bằng email</a>

                    <div className="flex items-center mt-20 mb-0">
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
                        <a href="#" className="text-gray-500 underline"> Chính sách bảo mật</a> của Tiki
                    </p>
                </div>

                {/* Right side - Image and text */}
                <div className="w-1/3 bg-blue-100 flex flex-col items-center justify-center text-center p-4">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
                        alt="Tiki Bot"
                        className="w-30 h-30 mb-3"
                    />
                    <p className="text-blue-600 font-semibold">Mua sắm tại Tiki</p>
                    <p className="text-gray-500 text-sm">Siêu ưu đãi mỗi ngày</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
