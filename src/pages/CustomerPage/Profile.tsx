import React from "react";
import { User, Bell, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <div className=" bg-[#F5F5FA] p-6 flex">
            {/* Sidebar */}
            <div className="w-1/4 rounded-xl ">
                <p className="text-gray-500 text-l">
                    <Link to="/" className="hover:underline">
                        Trang chủ
                    </Link>
                    &nbsp;&gt;&nbsp;
                    <span className="font-bold text-black">Đơn hàng của tôi</span>
                </p>
                <div className="flex items-center pb-4 mt-3">
                    <div className="w-13 h-13 bg-gray-300 rounded-full mb-2 mr-3 mt-2"></div>
                    <div className="flex-col">
                        <p className="text-gray-500">Tài khoản của</p>
                        <p className="font-semibold text-lg">Vũ Anh Tú</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <Link to="/user_profile"><div className="flex items-center gap-3 text-gray-700 hover:text-blue-600 cursor-pointer">
                        <User size={20} />
                        <p>Thông tin tài khoản</p>
                    </div></Link>
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

            {/* Main Content */}
            <div className="w-3/4 rounded-xl mt-15 ml-4">
                <div className="flex justify-between items-start pb-4 mb-4">
                    <div>
                        <h2 className="text-xl mb-1">Chi tiết đơn hàng #861977987 - <span className="text-black font-semibold ">Đang xử lý</span></h2>
                        <p className="text-sm text-black mt-2 ml-200">Ngày đặt hàng: 10:47 28/03/2025</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <h3 className="font-semibold mb-2">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                        <div className="bg-white p-4 rounded-lg space-y-1 h-35">
                            <p className="text-sm font-bold">VŨ ANH TÚ</p>
                            <p className="text-sm">Địa chỉ: số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội, Việt Nam</p>
                            <p className="text-sm">Điện thoại: 0942438693</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">HÌNH THỨC GIAO HÀNG</h3>
                        <div className="bg-white p-4 rounded-lg h-35 space-y-1">
                            <p className="text-sm "> <a className="text-sm text-red-500 mr-1 font-medium">NOW</a>Giao Siêu Tốc</p>
                            <p className="text-sm">Giao thứ 6, trước 13h, 28/03</p>
                            <p className="text-sm">Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)</p>
                            <p className="text-sm">Miễn phí vận chuyển</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">HÌNH THỨC THANH TOÁN</h3>
                        <div className="h-35 bg-white p-4 rounded-lg">
                            <p className="text-sm">Thanh toán tiền mặt khi nhận hàng</p>
                        </div>
                    </div>
                </div>

                <div className=" min-h-screen">
                    {/* Bảng sản phẩm */}
                    <div className="bg-white mb-0.5">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-gray-600">
                                    <th className="text-left p-3 w-1/3">Sản phẩm</th>
                                    <th className="text-left p-3 w-1/8">Giá</th>
                                    <th className="text-left p-3 w-1/6">Số lượng</th>
                                    <th className="text-left p-3 w-1/6">Giảm giá</th>
                                    <th className="text-right p-3 w-1/6">Tạm tính</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    {/* Nội dung bảng cuộn riêng khi cần */}
                    <div className="overflow-y-auto">
                        <table className="min-w-full text-sm">
                            <tbody>
                                <tr className="bg-white">
                                    <td className="p-3 space-y-5 flex items-start">
                                        <img
                                            src="https://pos.nvncdn.com/d8267c-94460/ps/20240814_8gNRnU3bNv.jpeg"
                                            alt="Chat GPT Thực Chiến"
                                            className="w-14 h-20 object-cover mr-5"
                                        />
                                        <div className="">
                                            <p className="mt-2 font-medium">Chat GPT Thực Chiến</p>
                                            <p className="mt-3 text-ml">Cung cấp bởi <a className=" text-blue-500">Tiki Trading</a></p>
                                            <p className="mt-3 text-xs text-blue-500 bg-yellow-200 font-bold rounded-2xl inline-block w-33">
                                                📦 30 NGÀY ĐỔI TRẢ
                                            </p>
                                            <p className="mt-3 text-ml text-black">Sku: 9831074249227</p>
                                            <button className="mt-3 text-[12px] p-2 w-30 text-blue-400 border rounded hover:text-blue-400 item-center">
                                                Chat với nhà bán
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-left p-3 w-2/13 align-top">110.000 ₫</td>
                                    <td className="text-left p-3 w-1/6 align-top">1</td>
                                    <td className="text-left p-3 w-1/6 align-top">0 ₫</td>
                                    <td className="text-right p-3 w-1/6 align-top">110.000 ₫</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    {/* Tổng kết đơn hàng */}
                    <div className="flex justify-end mt-0.5 bg-white h-50">
                        <div className="w-1/3 mr-4 mt-5 text-right">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span className="w-1/2 text-right">Tạm tính</span>
                                <span className="ml-auto">110.000 ₫</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span className="w-1/2 text-right">Phí vận chuyển</span>
                                <span className="ml-auto">25.000 ₫</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span className="w-1/2 text-right">Giảm giá vận chuyển</span>
                                <span className="ml-auto">-25.000 ₫</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold text-red-500 mb-4">
                                <span className="w-1/2 text-right">Tổng cộng</span>
                                <span className="ml-auto">110.000 ₫</span>
                            </div>

                            <button className="w-34 bg-yellow-300 text-black py-1.5 rounded-sm">
                                Hủy đơn hàng
                            </button>
                        </div>
                    </div>

                    <div className=" flex">
                        <div className="text-sm text-blue-600 cursor-pointer hover:text-gray-700 mb-2 mr-3 mt-5">
                            &laquo; Quay lại đơn hàng của tôi
                        </div>

                        <button className="w-60 mt-3 bg-yellow-300 text-black font-bold py-1.5 rounded-sm">
                            Theo dõi đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
