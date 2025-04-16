import React, { useEffect, useState } from "react";
import SidebarProfile from "../../shared/component/SideBarProfile";
import { useParams } from "react-router-dom";
import orderService from "../../api/order.service";
import { getBookById } from "../../api/book.service";
import { useAuth } from "../../context/AuthContext";
import { Order, Book } from "../../../interfaces";

const statusLabels: Record<Order['status'], string> = {
    pending: 'Đang chờ giải quyết',
    processing: 'Đang xử lý',
    shipping: 'Đang vận chuyển',
    delivered: 'Đã giao',
    cancelled: 'Đã huỷ'
};

export default function OrderDetail() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const [bookDetailsById, setBookDetailsById] = useState<Record<string, Book>>({});

    useEffect(() => {
        const fetchOrderDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                if (id) {
                    const fetchedOrder = await orderService.getOrderById(id);
                    setOrder(fetchedOrder);
                    const bookDetails: Record<string, Book> = {};
                    const promises = fetchedOrder.items.map(async (item) => {
                        const book = await getBookById(item.book_id);
                        bookDetails[item.book_id] = book;
                    });
                    await Promise.all(promises);
                    setBookDetailsById(bookDetails);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.message || "Lỗi khi tải chi tiết đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [id]);


    if (loading) {
        return <div>Đang tải chi tiết đơn hàng...</div>;
    }

    if (error) {
        return <div className="text-red-500">Lỗi: {error}</div>;
    }

    if (!order) {
        return <div>Không tìm thấy đơn hàng.</div>;
    }

    return (
        <div className="bg-[#F5F5FA] p-5 pl-15 pr-15 flex">
            <SidebarProfile />
            {/* Main Content */}
            <div className="w-4/5 rounded-xl mt-12">
                <div className="flex justify-between items-start pb-4">
                    <h2 className="text-xl mb-1 text-gray-700">Chi tiết đơn hàng #{order.id} - <span className="text-black font-normal ">{statusLabels[order.status] || order.status}</span></h2>
                </div>
                <p className="text-sm text-black text-right mb-4 w-full">Ngày đặt hàng: {new Date(order.created_at).toLocaleString()}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <h3 className="mb-4 text-[14px]">ĐỊA CHỈ NGƯỜI NHẬN</h3>
                        <div className="bg-white p-4 rounded-[4px] space-y-1 h-35 ">
                            {user ? (
                                <>
                                    <p className="text-sm font-semibold">{user.name}</p>
                                    <p className="text-sm text-gray-600">Địa chỉ: {user.address?.street}, {user.address?.district}, {user.address?.city}</p>
                                    <p className="text-sm text-gray-600">Điện thoại: {user.phone}</p>
                                </>
                            ) : (
                                <p className="text-sm text-gray-600">Không có thông tin tài khoản.</p>
                            )}
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
                            <p className="text-sm text-gray-600">{order.payment_method === 'cash' ? 'Thanh toán tiền mặt khi nhận hàng' : order.payment_method}</p>
                        </div>
                    </div>
                </div>

                <div className=" min-h-screen">
                    {/* Bảng sản phẩm */}
                    <div className="bg-white overflow-y-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-gray-600">
                                    <th className="text-left p-3 w-1/3">Sản phẩm</th>
                                    <th className="text-center p-3 w-1/8">Giá</th>
                                    <th className="text-center p-3 w-1/6">Số lượng</th>
                                    <th className="text-center p-3 w-1/6">Giảm giá</th>
                                    <th className="text-right p-3 w-1/6">Tạm tính</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item) => {
                                    const book = bookDetailsById[item.book_id];
                                    if (!book) return null;
                                    const discount = (book.original_price - book.current_seller.price) * item.quantity;
                                    const subtotal = item.quantity * item.price;
                                    return (
                                        <tr key={item.book_id} className="bg-white border-b border-gray-200">
                                            <td className="p-3 flex items-start">
                                                <img
                                                    src={book.images[0]?.large_url || "https://via.placeholder.com/80x120?text=No+Image"}
                                                    alt={book.name}
                                                    className="w-14 h-20 object-cover mr-5"
                                                />
                                                <div>
                                                    <p className="mt-2 font-medium">{book.name}</p>
                                                    <p className="mt-3 text-[13px]">Cung cấp bởi <a className="text-blue-500 text-[13px]">Tiki Trading</a></p>
                                                    <img src="/src/images/doitra.png" alt="30NgayDoiTra" className="mt-3 h-6" />
                                                    <button className="mt-3 text-[12px] p-2 w-30 text-blue-400 border rounded hover:text-blue-400">
                                                        Chat với nhà bán
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center p-3 align-top">{item.price.toLocaleString()} ₫</td>
                                            <td className="text-center p-3 align-top">{item.quantity}</td>
                                            <td className="text-center p-3 align-top">{discount.toLocaleString()} ₫</td>
                                            <td className="text-right p-3 align-top">{subtotal.toLocaleString()} ₫</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-0.5 bg-white h-50">
                        <div className="w-1/3 mr-4 mt-5 text-right">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="w-1/2 text-right text-gray-500">Tạm tính</span>
                                <span className="ml-auto">{order.total_amount.toLocaleString()}₫</span>
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
                                <span className="ml-auto text-xl text-red-500">{order.total_amount.toLocaleString()}₫</span>
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
