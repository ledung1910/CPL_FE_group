import React from "react";
import SidebarProfile from "../../shared/component/SideBarProfile";


export default function Profile() {
    return (
        <div className="bg-[#F5F5FA] p-5 pl-15 pr-15 flex">
            <SidebarProfile />
            {/* Main Content */}
            <div className="w-4/5 rounded-xl mt-12">
                <div className="flex justify-between items-start pb-4">
                    <h2 className="text-xl mb-1 text-gray-700">Chi tiết đơn hàng #861977987 - <span className="text-black font-normal ">Đang xử lý</span></h2>
                </div>
                <p className="text-sm text-black text-right mb-4 w-full">Ngày đặt hàng: 10:47 28/03/2025</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <h3 className="mb-4 text-[14px]">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                        <div className="bg-white p-4 rounded-[4px] space-y-1 h-35 ">
                            <p className="text-sm font-semibold">VŨ ANH TÚ</p>
                            <p className="text-sm text-gray-600">Địa chỉ: số 17 Duy Tân, Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội, Việt Nam</p>
                            <p className="text-sm text-gray-600">Điện thoại: 0942438693</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-[14px]">HÌNH THỨC GIAO HÀNG</h3>
                        <div className="bg-white p-4 rounded-[4px] h-35 space-y-1">
                            <p className="text-sm text-gray-600"> <a className="text-sm text-red-500 mr-1 font-medium">NOW</a>Giao Siêu Tốc</p>
                            <p className="text-sm text-gray-600">Giao thứ 6, trước 13h, 28/03</p>
                            <p className="text-sm text-gray-600">Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)</p>
                            <p className="text-sm text-gray-600">Miễn phí vận chuyển</p>
                        </div>
                    </div>

                    <div>
                        <h3 className=" mb-4 text-[14px]">HÌNH THỨC THANH TOÁN</h3>
                        <div className="h-35 bg-white p-4 rounded-[4px]">
                            <p className="text-sm text-gray-600">Thanh toán tiền mặt khi nhận hàng</p>
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
                                            <p className="mt-2">Chat GPT Thực Chiến</p>
                                            <p className="mt-3 text-[13px]">Cung cấp bởi <a className=" text-blue-500 text-[13px]">Tiki Trading</a></p>
                                            <img
                                                src="https://salt.tikicdn.com/ts/ta/b1/3f/4e/cc3d0a2dd751a7b06dd97d868d6afa56.png"
                                                alt="30 ngày đổi trả"
                                                className="mt-3 w-[120px] h-auto rounded-2xl inline-block"
                                            />
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

                    <div className="flex justify-end mt-0.5 bg-white h-50">
                        <div className="w-1/3 mr-4 mt-5 text-right">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="w-1/2 text-right text-gray-500">Tạm tính</span>
                                <span className="ml-auto">110.000 ₫</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="w-1/2 text-right text-gray-500">Phí vận chuyển</span>
                                <span className="ml-auto">25.000 ₫</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="w-1/2 text-right text-gray-500">Giảm giá vận chuyển</span>
                                <span className="ml-auto">-25.000 ₫</span>
                            </div>
                            <div className="flex justify-between text-sm   mb-4">
                                <span className="w-1/2 text-right text-gray-500">Tổng cộng</span>
                                <span className="ml-auto text-xl text-red-500">110.000 ₫</span>
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

                        <button className="w-60 mt-3 bg-yellow-300 text-black font-semibold py-1.5 rounded-sm">
                            Theo dõi đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
