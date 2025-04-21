import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Order, Book } from "../../../../interfaces";
import { getOrderById } from "../../../api/order.service";
import { getBookById } from "../../../api/book.service";

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) return "N/A";
  return amount.toLocaleString("vi-VN") + " ₫";
};

const calculateAndFormatDeliveryDate = (isoString: string | undefined): string => {
  if (!isoString) return "Dự kiến sớm nhất";
  try {
    const orderDate = new Date(isoString);
    const deliveryDate = new Date(orderDate.getTime() + 24 * 60 * 60 * 1000);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deliveryDayOnly = new Date(deliveryDate);
    deliveryDayOnly.setHours(0, 0, 0, 0);

    let prefix = "Giao ";
    if (deliveryDayOnly.getTime() === today.getTime()) {
      prefix = "Giao hôm nay, ";
    }

    return (
      prefix +
      deliveryDate.toLocaleString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
      })
    );
  } catch (e) {
    console.error("Error calculating delivery date:", e);
    return "Dự kiến sớm nhất";
  }
};

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookDetails, setBookDetails] = useState<Record<string, Book>>({});
  const [loadingBooks, setLoadingBooks] = useState<boolean>(false);

  useEffect(() => {
    if (!orderId) {
      setError("Mã đơn hàng không hợp lệ.");
      setLoading(false);
      return;
    }

    const fetchOrderAndBookDetails = async () => {
      setLoading(true);
      setLoadingBooks(true);
      setError(null);
      setBookDetails({});

      try {
        console.log(`Workspaceing order with ID: ${orderId}`);
        const fetchedOrder = await getOrderById(orderId);
        console.log("Fetched order data:", fetchedOrder);
        setOrder(fetchedOrder);

        if (
          fetchedOrder &&
          fetchedOrder.items &&
          fetchedOrder.items.length > 0
        ) {
          const bookIds = fetchedOrder.items.map((item) => item.book_id);
          const uniqueBookIds = [...new Set(bookIds)];
          const bookPromises = uniqueBookIds.map((id) =>
            getBookById(id).catch((err) => {
              console.error(`Lỗi khi lấy sách ID ${id}:`, err);
              return null;
            })
          );
          const results = await Promise.all(bookPromises);
          const detailsMap: Record<string, Book> = {};
          results.forEach((book) => {
            if (book) { detailsMap[book.id] = book; }
          });
          setBookDetails(detailsMap);
        }
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Không thể tải thông tin đơn hàng. Vui lòng thử lại."
        );
        setOrder(null);
      } finally {
        setLoading(false);
        setLoadingBooks(false);
      }
    };

    fetchOrderAndBookDetails();
  }, [orderId]);

  const handleGoHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5fa] py-8 px-4 flex justify-center items-center">
        <p className="text-lg text-gray-600 animate-pulse">
          Đang tải thông tin đơn hàng...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f5fa] py-8 px-4 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-3">
            Đã xảy ra lỗi
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={handleGoHome}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f5f5fa] py-8 px-4 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-yellow-600 mb-3">
            Không tìm thấy đơn hàng
          </h2>
          <p className="text-gray-700 mb-4">
            Không có dữ liệu cho mã đơn hàng này.
          </p>
          <button
            onClick={handleGoHome}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  const deliveryDateString = calculateAndFormatDeliveryDate(order.created_at);

  return (
    <div className="min-h-screen bg-[#f5f5fa] py-8 px-4">
      <div className="max-w-[1000px] mx-auto flex flex-col lg:flex-row gap-4">
        <div className="flex-1 bg-white rounded-[8px] overflow-hidden relative min-h-[500px]">
          <div className="h-[120px] sm:h-[150px] bg-gradient-to-r from-[#00b5f1] to-[#005bea] relative flex items-start px-4 pt-6">
            <img
              src="/src/images/banner.png"
              alt="Confetti"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <img
              src="/src/images/tiki_ninja.png"
              alt="Tiki Mascot"
              className="absolute left-4 top-[20px] w-[140px] h-[140px] object-contain z-10"
            />

            <div className="relative z-20 flex items-center h-full pl-[120px] sm:pl-[180px]">
              <div className="text-white">
                <h1 className="text-[18px] sm:text-[22px] font-semibold leading-tight">
                  Yay, đặt hàng thành công!
                </h1>
                {order.payment_method === "cash" ? (
                  <p className="mt-[4px] text-[14px] sm:text-[16px]">
                    Chuẩn bị tiền mặt{" "}
                    <span className="font-bold">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </p>
                ) : (
                  <p className="mt-[4px] text-[14px] md:text-[16px]">
                    Đã thanh toán:{" "}
                    <span className="font-bold">
                      {formatCurrency(order.total_amount)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 pb-8 px-4 sm:px-6 lg:px-8 pl-[120px] sm:pl-[200px]">
            <div className="flex justify-between text-sm text-[#808089] mb-4">
              <span>Phương thức thanh toán</span>
              <span className="text-[#27272a] font-medium">
                {order.payment_method === "cash"
                  ? "Thanh toán tiền mặt"
                  : order.payment_method}
              </span>
            </div>
            <div className="flex justify-between text-sm text-[#808089] pt-4 border-t border-[#e5e5e5] mb-4">
              <span>Tổng cộng</span>
              <div className="text-right">
                <p className="text-[#27272a] font-semibold text-base">
                  {formatCurrency(order.total_amount)}
                </p>
                <p className="text-xs text-[#808089]">Đã bao gồm VAT nếu có</p>
              </div>
            </div>

            <button
              onClick={handleGoHome}
              className="mt-4 w-full py-[10px] border border-[#0b74e5] text-[#0b74e5] rounded font-medium hover:bg-[#f0f8ff] transition"
            >
              Quay về trang chủ
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[300px] bg-white rounded-[8px] p-4 text-sm shadow-sm h-fit">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-200 pb-2 mb-2">
            <span className="font-medium text-[#27272a]">
              Mã đơn hàng: {orderId}
            </span>
            <Link
              to={`/orders/${order.id}`}
              className="text-blue-600 rounded font-medium text-sm mt-2 sm:mt-0"
            >
              Xem đơn hàng
            </Link>
          </div>

          <p className="text-sm mt-2 font-medium">{deliveryDateString}</p>

          <div className="mt-4">
            {loadingBooks && (
              <p className="text-xs text-gray-500 animate-pulse mb-3">
                Đang tải chi tiết sản phẩm...
              </p>
            )}{" "}
            {!loadingBooks &&
              order.items.map((item) => {
                const details = bookDetails[item.book_id];
                const bookName = details?.name ?? "Loading...";
                const imageUrl =
                  details?.images?.[0]?.large_url || "/book-placeholder.png";
                return (
                  <div
                    key={item.book_id}
                    className="flex items-start gap-2 sm:gap-3 mb-3 pb-3 border-b last:border-b-0 border-gray-200"
                  >
                    {" "}
                    <img
                      src={imageUrl}
                      alt={bookName}
                      className="w-[50px] h-auto max-h-[75px] object-contain flex-shrink-0"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/book-placeholder.png";
                      }}
                    />
                    <div className="flex-grow min-w-0">
                      <p
                        className="text-[#27272a] text-sm font-normal leading-snug line-clamp-2"
                        title={bookName}
                      >
                        {bookName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-800 whitespace-nowrap ml-2">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                );
              })}
            {!loadingBooks && order.items.length === 0 && (
              <p className="text-gray-500 text-sm">
                Không có sản phẩm nào trong đơn hàng.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
