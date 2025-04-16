import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../../../interfaces';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBookById } from '../../api/book.service';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../api/order.service';

const promotions = [
    {
        title: 'Freeship',
        desc: 'Thẻ Shinhan Platinum',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Freeship',
        desc: 'Thẻ Shinhan Classic',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 30k',
        desc: 'Đơn từ 200k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 50k',
        desc: 'Đơn từ 300k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 50k',
        desc: 'Đơn từ 300k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 70k',
        desc: 'Đơn từ 500k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 100k',
        desc: 'Đơn từ 700k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 150k',
        desc: 'Đơn từ 1 triệu',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 30k',
        desc: 'Đơn từ 200k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 50k',
        desc: 'Đơn từ 300k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Giảm 70k',
        desc: 'Đơn từ 500k',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp',
    },
    {
        title: 'Freeship',
        desc: 'TikiCARD',
        logo: 'https://salt.tikicdn.com/cache/w144/ts/upload/69/30/59/70b4ec228ed2a642f4b90fd7353c96d5.png.webp',
    },
];

export default function Checkout() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const bookId = queryParams.get('bookId');
    const quantityParam = queryParams.get('quantity');
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const quantity = quantityParam ? parseInt(quantityParam, 10) : 1;
    const shippingFee = 25000;
    const { user } = useAuth();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [orderErrorMessage, setOrderErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (bookId) {
                try {
                    const bookData = await getBookById(bookId);
                    setBook(bookData);
                } catch (err) {
                    setError(err instanceof Error ? err.message : "Lỗi khi lấy thông tin sách");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [bookId]);

    if (loading) {
        return <div>Đang tải thông tin đơn hàng...</div>;
    }

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    if (!book) {
        return <div>Không tìm thấy thông tin sản phẩm.</div>;
    }

    const giaSachGiam = book.current_seller?.price || 0;
    const giaGoc = book.original_price || 0;
    const giaGiam = giaGoc - giaSachGiam;
    const tongTienHang = giaSachGiam * quantity;
    const tongTienThanhToan = tongTienHang;
    const phanTietKiem = (giaGiam * quantity) + shippingFee;

    const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod(event.target.value);
    };

    const handlePlaceOrder = async () => {
        if (!user) {
            setOrderErrorMessage("Bạn cần đăng nhập để đặt hàng.");
            return;
        }

        setIsPlacingOrder(true);
        setOrderErrorMessage(null);

        try {
            if (!book || !book.id || !user.id || !user.address || typeof giaSachGiam !== 'number') {
                console.error("Thiếu thông tin cần thiết để tạo đơn hàng:", { book, user, giaSachGiam });
                setOrderErrorMessage("Có lỗi xảy ra, vui lòng thử lại.");
                return;
            }

            const newOrder = await orderService.createInstantOrder(
                user.id,
                book.id,
                quantity,
                giaSachGiam,
                paymentMethod,
                user.address
            );
            const orderId = newOrder.id;
            if (orderId) {
                // Điều hướng sang trang Confirm với orderId trên URL path
                navigate(`/confirm/${orderId}`);
           } else {
               console.error("API không trả về ID đơn hàng:", newOrder);
               setOrderErrorMessage("Không thể lấy được mã đơn hàng sau khi tạo. Vui lòng liên hệ hỗ trợ.");
           }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Lỗi khi đặt hàng:", error);
            setOrderErrorMessage("Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 min-h-screen">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* ==== Cột trái ==== */}
                <div className="w-full lg:w-3/4 space-y-6">
                    {/* ==== Hình thức giao hàng ==== */}
                    <div className="bg-white rounded p-4">
                        <h2 className="text-xl font-semibold mb-4">Chọn hình thức giao hàng</h2>
                        <div className="relative bg-blue-50 border border-blue-200 rounded-xl p-4 w-110">
                            <div className="space-y-3">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        className="form-radio text-blue-500 mr-3 "
                                        defaultChecked
                                    />
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                                            alt="NOW"
                                            className="w-[35px] h-auto"
                                        />
                                        <span className="text-gray-700">Giao siêu tốc 2h</span>
                                        <span className="bg-white text-green-600 font-semibold text-sm px-2 py-0.5 rounded">-25K</span>
                                    </div>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        className="form-radio text-blue-500 mr-3"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-700">Giao tiết kiệm</span>
                                        <span className="bg-white text-green-600 font-semibold text-sm px-2 py-0.5 rounded">-16K</span>
                                    </div>
                                </label>
                            </div>
                            <img
                                src="https://salt.tikicdn.com/ts/upload/05/9e/d8/f13e86df128f19d197397e44924f9616.png"
                                alt="bubble tail"
                                className="absolute left-1/2 transform -translate-x-1/2 w-9 h-4"
                                style={{ marginTop: '0.9rem' }}
                            />
                        </div>

                        {/* Phần chi tiết sản phẩm */}
                        <div className="relative mt-13">
                            {/* Tiêu đề nằm đè lên viền */}
                            <div className="absolute -top-3 left-4 bg-white px-2 flex items-center text-green-600">
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png"
                                    alt="Gói giao hàng"
                                    className="w-5 h-5 mr-1"
                                />
                                <span>Gói: Giao siêu tốc 2h, trước 13h hôm nay</span>
                            </div>

                            {/* Box có viền */}
                            <div className="border border-gray-200 rounded-2xl p-4 pt-6">
                                {/* Dòng giao hàng và phí */}
                                <div className="flex justify-between items-center mb-2 text-[13px]">
                                    <div className="flex items-center gap-1">
                                        <img
                                            src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                                            alt="NOW"
                                            className="w-[32px] h-auto"
                                        />
                                        <span className="text-gray-800 uppercase">GIAO SIÊU TỐC 2H</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="line-through text-gray-500">25.000 ₫</span>
                                        <span className="text-green-600 font-semibold text-[15px]">MIỄN PHÍ</span>
                                        <span className="text-gray-400 text-xs mr-80">ⓘ</span>
                                    </div>
                                </div>

                                {/* Dòng sản phẩm */}
                                <div className="flex justify-between items-start ml-2">
                                    <div className="flex gap-4">
                                        <img
                                            src={book.images[0]?.large_url || "https://via.placeholder.com/80x120"}
                                            alt={book.name}
                                            className="w-10 h-12"
                                        />
                                        <div>
                                            <p className="text-gray-500 text-[15px]">{book.name}</p>
                                            <p className="text-gray-500 text-[15px]" >SL: x{quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end mt-5 mr-80">
                                        <div className="flex items-center gap-1">
                                            <p className="line-through text-gray-500 text-[13px]">{book.original_price?.toLocaleString('vi-VN')} ₫</p>
                                            <p className="text-red-500 text-xm">{book.current_seller?.price?.toLocaleString('vi-VN')} ₫</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-3 border-t border-gray-300 w-full" />

                        <button className="flex items-center mt-4 ml-2 gap-2 hover:underline text-black">
                            <FontAwesomeIcon icon={faTicket} className="text-blue-500" />
                            Thêm mã khuyến mãi của Shop
                            <span className="text-gray-400 text-3xl">{'>'}</span>
                        </button>
                    </div>

                    {/* ==== Phương thức thanh toán ==== */}
                    <div className="bg-white rounded p-4">
                        <h2 className="text-xl font-bold mb-4">Chọn hình thức thanh toán</h2>

                        <div className="space-y-4 mt-6">
                            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
                                <input type="radio" name="payment" onChange={handlePaymentMethodChange} defaultChecked className="form-radio text-blue-500 scale-125" />
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                                    alt="Thanh toán tiền mặt"
                                    className="w-9 h-9 object-contain"
                                />
                                <span className="text-gray-800">Thanh toán tiền mặt</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
                                <input type="radio" name="payment" onChange={handlePaymentMethodChange} className="form-radio text-blue-500 scale-125" />
                                <img src="https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png" alt="Viettel Money" className="w-9 h-9" />
                                <span className="text-gray-800">Viettel Money</span>
                            </label>
                        </div>

                        {/* Ưu đãi thanh toán thẻ */}
                        <div className="bg-[#f5f5fa] p-4 mt-4 w-190">
                            <div className="flex items-center text-[15px] gap-2 text-blue-700 font-medium mb-4">
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icons-promotion-outline.svg"
                                    alt="promotion"
                                    className="w-5 h-5"
                                />
                                Ưu đãi thanh toán thẻ
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {promotions.map((promo, index) => (
                                    <div
                                        key={index}
                                        className="bg-white  p-3 rounded shadow-sm flex justify-between items-start hover:shadow-md cursor-pointer"
                                    >
                                        <div>
                                            <div className="text-[#186bc4] font-medium text-lg">{promo.title}</div>
                                            <div className="text-[12px] text-gray-400">{promo.desc}</div>
                                            <div className="text-orange-500 text-[12px] italic mt-1">Không giới hạn</div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <img
                                                src={promo.logo}
                                                alt="logo"
                                                className={`object-contain ${promo.desc === 'TikiCARD' ? 'w-9 h-8' : 'w-20 h-auto'}`}
                                            />
                                            <span className="text-gray-400 text-lg">ⓘ</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ==== Cột phải ==== */}
                <div className="w-full lg:w-1/4 space-y-4">
                    {/* ==== Giao tới ==== */}
                    <div className="bg-white rounded p-4">
                        <div className="flex justify-between mb-2 text-[18px]">
                            <span className="text-gray-500 ">Giao tới</span>
                            <button className="text-blue-600 hover:underline text-[15px]">Thay đổi</button>
                        </div>
                        {user ? (
                            <>
                                <p className="font-semibold text-gray-800 text-[15px]">{user.name}
                                    {user.phone && <span className="ml-2 text-[15px]">{user.phone}</span>}
                                </p>
                                {user.address && (
                                    <p className="text-gray-500 mt-1 text-[15px]">
                                        {user.address.street && (
                                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-0.5 rounded mr-1">
                                                {user.address.district}
                                            </span>
                                        )}
                                        {user.address.street && `${user.address.street}, `}
                                        {user.address.district && `${user.address.district}, `}
                                        {user.address.city}
                                    </p>
                                )}
                            </>
                        ) : (
                            <p className="text-gray-500 mt-1 text-[15px]">Không có thông tin người dùng.</p>
                        )}
                    </div>

                    {/* ==== Khuyến mãi ==== */}
                    <div className="bg-white rounded p-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-medium">Tiki Khuyến Mãi</p>
                            <span className="text-sm text-gray-500">Có thể chọn 2 </span>
                        </div>

                        <div className="border border-blue-500 rounded-lg p-3 flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <img src="https://salt.tikicdn.com/cache/128x128/ts/upload/35/5a/84/aeb7211d441194fc09cd1baf3c1930e4.jpg" alt="FreeShip" className="w-10 h-10" />
                                <span className="text-blue-600 font-semibold">Giảm 25K</span>
                            </div>
                            <button className="text-blue-600 border border-blue-500 rounded px-3 py-1 text-sm font-medium">Bỏ chọn</button>
                        </div>

                        <button className="text-blue-600 hover:underline flex items-center gap-2 mt-2 text-[15px]">
                            <FontAwesomeIcon icon={faTicket} className="text-blue-500" />
                            Chọn hoặc nhập mã khác
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* ==== Đơn hàng ==== */}
                    <div className="bg-white rounded w-full max-w-md shadow">
                        {/* Tiêu đề */}
                        <div className="px-4 pt-4">
                            <div className="font-semibold text-lg">Đơn hàng</div>
                            <div className="text-sm text-gray-500 mt-1">
                                {quantity} sản phẩm. <span className="text-blue-500 cursor-pointer">Xem thông tin ▼</span>
                            </div>
                        </div>

                        <hr className="my-3 border-t border-gray-300 w-full" />

                        {/* Chi tiết giá */}
                        <div className="space-y-2 text-sm px-4">
                            <div className="flex justify-between text-gray-800">
                                <span>Tổng tiền hàng</span>
                                <span>{tongTienHang.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="flex justify-between text-gray-800">
                                <span>Phí vận chuyển</span>
                                <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Giảm giá trực tiếp</span>
                                <span className="text-green-600">
                                    -{(giaGiam * quantity).toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span className="flex items-center gap-1">
                                    Giảm giá vận chuyển
                                    <span className="text-gray-400 cursor-pointer">ⓘ</span>
                                </span>
                                <span className="text-green-600">-{shippingFee.toLocaleString('vi-VN')}đ</span> {/* Bạn có thể làm động phần này */}
                            </div>
                        </div>

                        <hr className="my-3 border-t border-gray-300 w-full" />

                        {/* Tổng thanh toán */}
                        <div className="flex justify-between items-center px-4 mb-1">
                            <span className="font-semibold text-base">Tổng tiền thanh toán</span>
                            <span className="text-red-600 text-xl font-bold">{tongTienThanhToan.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className="text-green-600 text-right text-sm mb-3 px-4">
                            Tiết kiệm {phanTietKiem.toLocaleString('vi-VN')} đ
                        </div>

                        {/* Ghi chú */}
                        <p className="text-xs text-gray-500 mb-4 text-right px-4">
                            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                        </p>

                        {/* Nút đặt hàng */}
                        <div className="px-4 pb-4">
                            <button
                                onClick={handlePlaceOrder}
                                className={`w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded text-base font-medium ${isPlacingOrder ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isPlacingOrder}
                            >
                                {isPlacingOrder ? 'Đang đặt hàng...' : 'Đặt hàng'}
                            </button>
                            {orderErrorMessage && <p className="text-red-500 text-sm mt-2">{orderErrorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


