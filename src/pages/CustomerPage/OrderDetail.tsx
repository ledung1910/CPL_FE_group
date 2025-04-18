/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import SidebarProfile from "../../shared/component/SideBarProfile";
import { useParams, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

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

    const handleCancelOrder = async () => {
        if (order && (order.status === 'pending' || order.status === 'processing')) {
            try {
                setLoading(true);
                const currentTimeISO = new Date().toISOString();
                const updatedOrderData = await orderService.updateOrderStatus(order.id, 'cancelled', currentTimeISO);
                if (updatedOrderData === undefined) {
                    setOrder({ ...order, status: 'cancelled', updated_at: currentTimeISO });
                } else if (updatedOrderData) {
                    setOrder({ ...order, status: 'cancelled', updated_at: currentTimeISO });
                } else {
                    setError("Lỗi khi hủy đơn hàng.");
                }
            } catch (error: any) {
                console.error("Lỗi trong catch block:", error);
                setError(error.message || "Đã có lỗi xảy ra khi hủy đơn hàng.");
            } finally {
                setLoading(false);
            }
        }
    };
    const canCancelOrder = order.status === 'pending' || order.status === 'processing';
    return (
        <div className="bg-[#F5F5FA] p-5 md:pl-15 md:pr-15 flex flex-col md:flex-row gap-4">
            <SidebarProfile orderId={id} />
            <div className="w-full md:w-4/5 rounded-xl mt-3 md:mt-12">
                <div className="flex justify-between items-start pb-4">
                    <h2 className="text-xl mb-1 text-gray-700">Chi tiết đơn hàng #{order.id} - <span className="text-black font-normal ">{statusLabels[order.status] || order.status}</span></h2>
                </div>
                <p className="text-sm text-black text-right mb-4 w-full">Ngày đặt hàng: {new Date(order.created_at).toLocaleString()}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
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

                <div className="min-h-screen">
                    <div className="bg-white overflow-x-auto">
                        <table className="min-w-[800px] w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-600">
                                    <th className="p-3 w-1/3">Sản phẩm</th>
                                    <th className="p-3 w-1/6 text-center">Giá</th>
                                    <th className="p-3 w-1/6 text-center">Số lượng</th>
                                    <th className="p-3 w-1/6 text-center">Giảm giá</th>
                                    <th className="p-3 w-1/6 text-right">Tạm tính</th>
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
                                            <td className="p-3 flex items-start min-w-[250px]">
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

                    <div className="flex justify-end mt-0.5 bg-white">
                        <div className="w-full md:w-1/3 mr-4 mt-5 text-right">
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
                            <div className="flex justify-between text-sm mb-4">
                                <span className="w-1/2 text-right text-gray-500">Tổng cộng</span>
                                <span className="ml-auto text-xl text-red-500">{order.total_amount.toLocaleString()}₫</span>
                            </div>

                            {canCancelOrder && (
                                <button onClick={handleCancelOrder} className="w-34 bg-yellow-300 text-black py-1.5 mb-4 rounded-sm">
                                    Hủy đơn hàng
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center m-4">
                        <div className="flex items-center gap-2">
                            <span
                                onClick={() => navigate('/orders')}
                                className="text-sm text-blue-600 cursor-pointer hover:text-gray-700"
                            >
                                &laquo; Quay lại đơn hàng của tôi
                            </span>
                            <button className="bg-yellow-300 text-black font-semibold py-2 px-3 rounded-sm">
                                Theo dõi đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
