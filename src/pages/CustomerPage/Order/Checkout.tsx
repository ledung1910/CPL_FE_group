import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Address, Book, Order, OrderItem, Voucher, ShippingMethod } from "../../../../interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookById } from "../../../api/book.service";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { createOrder } from "../../../api/order.service";
import { clearCart } from "../../../api/cart.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartItemWithDetails {
  book: Book | null;
  quantity: number;
}

const promotions = [
  {
    title: "Freeship",
    desc: "Thẻ Shinhan Platinum",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Freeship",
    desc: "Thẻ Shinhan Classic",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 30k",
    desc: "Đơn từ 200k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 50k",
    desc: "Đơn từ 300k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 50k",
    desc: "Đơn từ 300k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 70k",
    desc: "Đơn từ 500k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 100k",
    desc: "Đơn từ 700k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 150k",
    desc: "Đơn từ 1 triệu",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 30k",
    desc: "Đơn từ 200k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 50k",
    desc: "Đơn từ 300k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Giảm 70k",
    desc: "Đơn từ 500k",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/82/7e/9c/71b1c0645d326924f53c6329ecd2bf2a.png.webp",
  },
  {
    title: "Freeship",
    desc: "TikiCARD",
    logo: "https://salt.tikicdn.com/cache/w144/ts/upload/69/30/59/70b4ec228ed2a642f4b90fd7353c96d5.png.webp",
  },
];

const AVAILABLE_VOUCHERS: Voucher[] = [
  {
    id: 'SHIP_NOW_15K',
    name: 'Giảm 15K phí ship NOW cho đơn từ 2 sản phẩm',
    discount_type: 'shipping',
    discount_value: 15000,
    min_items: 2,
    applicable_shipping_method: 'NOW',
  },
  {
    id: 'FREESHIP_EXTRA_NOW',
    name: 'Miễn phí vận chuyển cho đơn Freeship Extra & Ship Now',
    discount_type: 'shipping',
    discount_value: Infinity,
    requires_freeship_extra: true,
    requires_ship_now: true,
  },
  {
    id: 'TOTAL_30K_OVER_200K',
    name: 'Giảm 30K tổng đơn hàng từ 200K với 2 sản phẩm trở lên',
    discount_type: 'total_order',
    discount_value: 30000,
    min_items: 2,
    min_order_value: 200000,
  },
];

const BASE_NOW_SHIPPING_COST = 25000;
const BASE_STANDARD_SHIPPING_COST = 16000;

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const cartItemsFromState: OrderItem[] | undefined = location.state?.cartItems;
  const queryParams = new URLSearchParams(location.search);
  const singleBookId = queryParams.get("bookId");
  const singleQuantityParam = queryParams.get("quantity");

  const [orderItemsWithDetails, setOrderItemsWithDetails] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderErrorMessage, setOrderErrorMessage] = useState<string | null>(null);

  const [availableShippingOptions, setAvailableShippingOptions] = useState<{ method: ShippingMethod; cost: number; originalCost: number }[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | null>(null);
  const [applicableVouchers, setApplicableVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isVoucherListVisible, setIsVoucherListVisible] = useState(false);


  const subtotal = orderItemsWithDetails.reduce(
    (sum, item) => sum + (item.book?.current_seller?.price || 0) * item.quantity, 0
  );

  const totalOriginalPrice = orderItemsWithDetails.reduce(
    (sum, item) => sum + (item.book?.original_price || 0) * item.quantity, 0
  );

  const itemDiscount = totalOriginalPrice - subtotal;

  const calculateVoucherActualDiscount = (voucher: Voucher, shippingFeeBeforeVoucher: number): number => {
    if (!voucher) return 0;
    if (voucher.discount_type === 'shipping') {
      if (shippingFeeBeforeVoucher <= 0) return 0;
      const discount = voucher.discount_value === Infinity ? shippingFeeBeforeVoucher : voucher.discount_value;
      return Math.min(shippingFeeBeforeVoucher, discount);
    } else if (voucher.discount_type === 'total_order') {
      return voucher.discount_value;
    }
    return 0;
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      let itemsToFetch: OrderItem[] = [];
      if (cartItemsFromState && cartItemsFromState.length > 0) {
        itemsToFetch = cartItemsFromState;
      } else if (singleBookId) {
        const singleQuantity = singleQuantityParam ? parseInt(singleQuantityParam, 10) : 1;
        if (!isNaN(singleQuantity) && singleQuantity > 0) {
          itemsToFetch = [{ book_id: singleBookId, quantity: singleQuantity, price: 0 }];
        } else {
          setError("Số lượng sách không hợp lệ.");
          setLoading(false);
          return
        }
      }

      if (itemsToFetch.length > 0) {
        try {
          const detailedItemsPromises = itemsToFetch.map(async (item) => {
            const bookData = await getBookById(item.book_id);
            if (!bookData) return null;
            return { book: bookData, quantity: item.quantity };
          });
          const itemsWithDetailsRaw = await Promise.all(detailedItemsPromises);
          const validItems = itemsWithDetailsRaw.filter(item => item !== null) as CartItemWithDetails[];
          setOrderItemsWithDetails(validItems);
          console.log("Book details fetched successfully");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Lỗi khi lấy thông tin sách");
          console.error("Error fetching book details:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Không có sản phẩm nào để thanh toán.");
        setOrderItemsWithDetails([]);
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [cartItemsFromState, singleBookId, singleQuantityParam]);

  useEffect(() => {
    if (orderItemsWithDetails.length === 0 || loading) {
      setAvailableShippingOptions([]);
      setSelectedShippingMethod(null);
      setApplicableVouchers([]);
      setSelectedVoucher(null);
      setIsVoucherListVisible(false);
      return;
    }

    const hasShipNowItem = orderItemsWithDetails.some(item => item.book?.is_ship_now);
    const hasFreeshipExtraItem = orderItemsWithDetails.some(item => item.book?.is_freeship_extra);
    const itemCount = orderItemsWithDetails.length;

    const currentShippingOptions: { method: ShippingMethod; cost: number; originalCost: number }[] = [];

    let standardShippingCost = BASE_STANDARD_SHIPPING_COST;
    const originalStandardCost = BASE_STANDARD_SHIPPING_COST;
    if (hasFreeshipExtraItem || itemCount >= 2) {
      standardShippingCost = 0;
    }
    currentShippingOptions.push({ method: 'Standard', cost: standardShippingCost, originalCost: originalStandardCost });

    if (hasShipNowItem) {
      let nowShippingCost = BASE_NOW_SHIPPING_COST;
      const originalNowCost = BASE_NOW_SHIPPING_COST;

      if (hasFreeshipExtraItem) {
        nowShippingCost = 0;
      } else if (itemCount >= 2) {
        nowShippingCost = Math.max(0, BASE_NOW_SHIPPING_COST - 15000);
      }
      currentShippingOptions.push({ method: 'NOW', cost: nowShippingCost, originalCost: originalNowCost });
    }

    setAvailableShippingOptions(currentShippingOptions);

    const defaultMethod = currentShippingOptions.find(opt => opt.method === 'NOW') ? 'NOW' : currentShippingOptions.length > 0 ? 'Standard' : null;
    setSelectedShippingMethod(defaultMethod);

    // Lọc các voucher khả dụng
    const filteredVouchers = AVAILABLE_VOUCHERS.filter(voucher => {
      // Điều kiện chung
      if (voucher.min_items && itemCount < voucher.min_items) return false;
      if (voucher.min_order_value && subtotal < voucher.min_order_value) return false;
      if (voucher.requires_freeship_extra && !hasFreeshipExtraItem) return false;
      if (voucher.requires_ship_now && !hasShipNowItem) return false;

      if (voucher.discount_type === 'shipping') {
        const shippingOption = currentShippingOptions.find(opt => opt.method === voucher.applicable_shipping_method);
        return shippingOption && shippingOption.cost > 0;
      }
      return true;
    });

    setApplicableVouchers(filteredVouchers);

    let bestVoucher: Voucher | null = null;
    if (filteredVouchers.length > 0) {
      let maxDiscount = -1;
      const defaultShippingOption = currentShippingOptions.find(opt => opt.method === defaultMethod);
      const shippingFeeForCalc = defaultShippingOption?.cost ?? 0;

      filteredVouchers.forEach(voucher => {
        let currentDiscount = 0;
        if (voucher.discount_type === 'total_order') {
          currentDiscount = calculateVoucherActualDiscount(voucher, shippingFeeForCalc);
        } else if (voucher.discount_type === 'shipping' && voucher.applicable_shipping_method === defaultMethod) {
          currentDiscount = calculateVoucherActualDiscount(voucher, shippingFeeForCalc);
        }

        if (currentDiscount > maxDiscount) {
          maxDiscount = currentDiscount;
          bestVoucher = voucher;
        }
      });
      if (maxDiscount <= 0) {
        bestVoucher = null;
      }
    }

    setSelectedVoucher(bestVoucher);
    setSelectedShippingMethod(defaultMethod);
    setIsVoucherListVisible(false);

  }, [orderItemsWithDetails, loading, subtotal]);

  const selectedShippingOption = availableShippingOptions.find(opt => opt.method === selectedShippingMethod);
  const initialShippingFee = selectedShippingOption?.cost ?? 0;

  let voucherShippingDiscount = 0;
  let voucherTotalOrderDiscount = 0;

  if (selectedVoucher) {
    if (selectedVoucher.discount_type === 'shipping' && selectedVoucher.applicable_shipping_method === selectedShippingMethod) {
      voucherShippingDiscount = Math.min(initialShippingFee, selectedVoucher.discount_value === Infinity ? initialShippingFee : selectedVoucher.discount_value);
    } else if (selectedVoucher.discount_type === 'total_order') {
      voucherTotalOrderDiscount = selectedVoucher.discount_value;
    }
  }

  const finalShippingFee = Math.max(0, initialShippingFee - voucherShippingDiscount);
  const totalDiscount = itemDiscount + voucherShippingDiscount + voucherTotalOrderDiscount;
  const totalPaymentAmount = Math.max(0, subtotal + finalShippingFee - voucherTotalOrderDiscount);
  const originalShippingFeeForSavings = selectedShippingOption?.originalCost ?? 0;
  const totalSavings = itemDiscount + Math.max(0, originalShippingFeeForSavings - finalShippingFee) + voucherTotalOrderDiscount;
  const totalQuantity = orderItemsWithDetails.reduce((sum, item) => sum + item.quantity, 0);

  const handleShippingMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMethod = event.target.value as ShippingMethod;
    setSelectedShippingMethod(newMethod);

    let bestVoucherForNewMethod: Voucher | null = null;
    if (applicableVouchers.length > 0) {
      let maxDiscount = -1;
      const newShippingOption = availableShippingOptions.find(opt => opt.method === newMethod);
      const shippingFeeForCalc = newShippingOption?.cost ?? 0;

      applicableVouchers.forEach(voucher => {
        let currentDiscount = 0;
        if (voucher.discount_type === 'total_order') {
          currentDiscount = calculateVoucherActualDiscount(voucher, shippingFeeForCalc);
        } else if (voucher.discount_type === 'shipping' && voucher.applicable_shipping_method === newMethod) {
          currentDiscount = calculateVoucherActualDiscount(voucher, shippingFeeForCalc);
        }

        if (currentDiscount > maxDiscount) {
          maxDiscount = currentDiscount;
          bestVoucherForNewMethod = voucher;
        }
      });
      if (maxDiscount <= 0) {
        bestVoucherForNewMethod = null;
      }
    }
    if (selectedVoucher !== bestVoucherForNewMethod) {
      setSelectedVoucher(bestVoucherForNewMethod);
    }
    setIsVoucherListVisible(false);
  };

  const handleVoucherSelection = (voucher: Voucher | null) => {
    setSelectedVoucher(voucher);
    setIsVoucherListVisible(false);
  };

  const handleToggleVoucherList = () => {
    setIsVoucherListVisible(!isVoucherListVisible);
  };

  const handleDeselectVoucher = () => {
    setSelectedVoucher(null);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPaymentMethod = event.target.value;
    if (newPaymentMethod === 'viettelpay') {
      toast.warning('Hình thức thanh toán Viettel Money hiện chưa khả dụng. Vui lòng chọn phương thức khác.');
    } else {
      setPaymentMethod(newPaymentMethod);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setOrderErrorMessage("Bạn cần đăng nhập để đặt hàng.");
      return;
    }
    if (!user.address || !user.address.street || !user.address.city || !user.address.district) {
      setOrderErrorMessage(
        "Vui lòng cập nhật địa chỉ giao hàng đầy đủ trước khi đặt hàng."
      );
      return;
    }
    if (!selectedShippingMethod) {
      setOrderErrorMessage("Vui lòng chọn hình thức giao hàng.");
      return;
    }

    setIsPlacingOrder(true);
    setOrderErrorMessage(null);

    try {
      const orderItems: OrderItem[] = orderItemsWithDetails
        .map((item) => {
          if (
            item.book?.id && typeof item.book?.current_seller?.price === "number"
          ) {
            return {
              book_id: item.book.id,
              quantity: item.quantity,
              price: item.book.current_seller.price,
            };
          }
          console.error("Skipping item due to missing info:", item);
          throw new Error(
            `Thông tin sản phẩm không hợp lệ: ${item.book?.name || "Unknown"}`
          );
        })
        .filter((item): item is OrderItem => item !== null);

      if (orderItems.length !== orderItemsWithDetails.length) {
        throw new Error("Một số sản phẩm trong giỏ hàng không hợp lệ.");
      }

      if (orderItems.length === 0) {
        throw new Error("Không có sản phẩm hợp lệ để đặt hàng.");
      }

      const shippingAddress: Address = user.address;

      const orderPayload: Omit<Order, "id" | "created_at" | "updated_at"> = {
        user_id: user.id,
        items: orderItems,
        subtotal: subtotal,
        shipping_method: selectedShippingMethod,
        shipping_fee: initialShippingFee,
        voucher: selectedVoucher,
        total_discount: totalDiscount,
        total_amount: totalPaymentAmount,
        status: "pending",
        payment_method: paymentMethod,
        shipping_address: shippingAddress,
      };
      const newOrder = await createOrder(orderPayload);

      if (newOrder && newOrder.id) {
        if (cartItemsFromState) {
          clearCart();
        }
        navigate(`/confirm/${newOrder.id}`, { replace: true, state: { order: newOrder } });
      } else {
        console.error("API did not return a valid order:", newOrder);
        setOrderErrorMessage("Không thể tạo đơn hàng. Vui lòng thử lại hoặc liên hệ hỗ trợ.");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      setOrderErrorMessage(
        error instanceof Error ? error.message : "Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (loading) { return <div>Đang tải thông tin đơn hàng...</div>; }
  if (error) { return <div>Lỗi: {error}</div>; }
  if (orderItemsWithDetails.length === 0 && !loading) { return <div>Không có sản phẩm nào trong đơn hàng.</div>; }

  const findShippingOption = (method: ShippingMethod) => availableShippingOptions.find(opt => opt.method === method);
  const nowOption = findShippingOption('NOW');
  const standardOption = findShippingOption('Standard');

  const totalShippingDiscountDisplay = selectedShippingOption
    ? Math.max(0, selectedShippingOption.originalCost - finalShippingFee)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen bg-gray-100">
      {" "}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/4 space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Chọn hình thức giao hàng</h2>
            <div className="relative bg-sky-50 border border-sky-200 rounded-lg p-4 mb-12">
              <div className="space-y-3">
                {nowOption && (
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="shipping"
                      value="NOW"
                      checked={selectedShippingMethod === 'NOW'}
                      onChange={handleShippingMethodChange}
                      className="form-radio text-blue-600 h-5 w-5 mr-3 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2 flex-grow">
                      <img
                        src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                        alt="NOW"
                        className="w-[35px] h-auto"
                      />
                      <span className="text-gray-700 group-hover:text-blue-700">
                        Giao siêu tốc 2h
                      </span>
                    </div>

                    <div className="flex items-baseline ml-2">
                      <span className={`font-semibold text-sm ${nowOption.cost === 0 ? 'text-green-700' : 'text-gray-800'}`}>
                        {nowOption.cost === 0 ? 'Miễn phí' : `${nowOption.cost.toLocaleString('vi-VN')} ₫`}
                      </span>
                      {nowOption.cost === 0 && nowOption.originalCost > 0 && (
                        <span className="line-through text-gray-500 text-xs ml-1.5">
                          {nowOption.originalCost.toLocaleString("vi-VN")} ₫
                        </span>
                      )}
                      {nowOption.cost > 0 && nowOption.cost < nowOption.originalCost && (
                        <span className="line-through text-gray-500 text-xs ml-1.5">
                          {nowOption.originalCost.toLocaleString("vi-VN")} ₫
                        </span>
                      )}
                    </div>
                  </label>
                )}

                {standardOption && (
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="shipping"
                      value="Standard"
                      checked={selectedShippingMethod === 'Standard'}
                      onChange={handleShippingMethodChange}
                      className="form-radio text-blue-600 h-5 w-5 mr-3 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex items-center space-x-2 flex-grow">
                      <span className="text-gray-700 group-hover:text-blue-700">
                        Giao tiết kiệm
                      </span>
                    </div>
                    <div className="flex items-baseline ml-2">
                      <span className={`font-semibold text-sm ${standardOption.cost === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        {standardOption.cost === 0 ? 'Miễn phí' : `${standardOption.cost.toLocaleString('vi-VN')} ₫`}
                      </span>
                      {standardOption.cost === 0 && standardOption.originalCost > 0 && (
                        <span className="line-through text-gray-500 text-xs ml-1.5">
                          {standardOption.originalCost.toLocaleString("vi-VN")} ₫
                        </span>
                      )}
                      {standardOption.cost > 0 && standardOption.cost < standardOption.originalCost && (
                        <span className="line-through text-gray-500 text-xs ml-1.5">
                          {standardOption.originalCost.toLocaleString("vi-VN")} ₫
                        </span>
                      )}
                    </div>
                  </label>
                )}
                {availableShippingOptions.length === 0 && (
                  <p className="text-gray-500 text-sm">Không có hình thức giao hàng phù hợp cho đơn hàng này.</p>
                )}
              </div>
            </div>

            {selectedShippingOption && (
              <div className="relative">
                <div className="absolute -top-3 left-4 bg-white px-2 flex items-center text-green-600 text-sm font-medium">
                  <img
                    src="https://salt.tikicdn.com/ts/upload/ad/b7/93/7094a85d0b6d299f30ed89b03511deb9.png"
                    alt="Gói giao hàng"
                    className="w-5 h-5 mr-1"
                  />
                  <span>
                    Gói: {selectedShippingMethod === 'NOW' ? 'Giao siêu tốc 2h' : 'Giao tiết kiệm'}
                  </span>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 pt-6">
                  <div className="flex justify-between items-center mb-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      {selectedShippingMethod === 'NOW' && (
                        <img
                          src="https://salt.tikicdn.com/ts/tka/a8/31/b6/802e2c99dcce64c67aa2648edb15dd25.png"
                          alt="NOW"
                          className="w-[32px] h-auto"
                        />
                      )}
                      <span className="text-gray-800 uppercase font-medium">
                        {selectedShippingMethod === 'NOW' ? 'GIAO SIÊU TỐC 2H' : 'GIAO TIẾT KIỆM'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedShippingOption.originalCost > finalShippingFee && (
                        <span className="line-through text-gray-500">
                          {selectedShippingOption.originalCost.toLocaleString("vi-VN")} ₫
                        </span>
                      )}
                      <span className={`font-semibold ${finalShippingFee === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        {finalShippingFee === 0 ? "MIỄN PHÍ" : `${finalShippingFee.toLocaleString("vi-VN")} ₫`}
                      </span>
                      {totalShippingDiscountDisplay > 0 && (
                        <span
                          className="text-gray-400 cursor-help"
                          title={`Được giảm ${totalShippingDiscountDisplay.toLocaleString("vi-VN")}đ phí vận chuyển`}
                        >
                          ⓘ
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {orderItemsWithDetails.map(
                      (item) =>
                        item.book && (
                          <div
                            key={item.book.id}
                            className="flex justify-between items-start py-2 border-t border-gray-100 first:border-t-0"
                          >
                            <div className="flex gap-3">
                              <img
                                src={item.book.images[0]?.large_url || "https://via.placeholder.com/60x60"}
                                alt={item.book.name}
                                className="w-16 h-16 object-contain rounded border border-gray-200"
                              />
                              <div>
                                <p className="text-gray-800 text-sm line-clamp-2 mb-1">
                                  {item.book.name}
                                </p>{" "}
                                <p className="text-gray-500 text-xs">
                                  SL: x{item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end min-w-[100px] text-right">
                              {" "}
                              <p className="text-red-600 text-sm font-medium">
                                {item.book.current_seller?.price?.toLocaleString("vi-VN")} ₫
                              </p>
                              {item.book.original_price &&
                                item.book.original_price > (item.book.current_seller?.price || 0) && (
                                  <p className="line-through text-gray-500 text-xs mt-0.5">
                                    {item.book.original_price?.toLocaleString("vi-VN")} ₫
                                  </p>
                                )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                  <hr className="my-3 border-t border-gray-200" />{" "}
                  <button className="flex items-center text-sm gap-2 text-blue-600 hover:text-blue-700">
                    <FontAwesomeIcon icon={faTicket} />
                    Thêm mã khuyến mãi của Shop
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            {!selectedShippingMethod && availableShippingOptions.length > 0 && (
              <p className="text-center text-gray-500 mt-4">Vui lòng chọn một hình thức giao hàng.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Chọn hình thức thanh toán
            </h2>
            <div className="space-y-4 mt-6">
              <label className="flex items-center gap-3 cursor-pointer text-[15px]">
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio text-blue-500 scale-125"
                />
                <img
                  src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                  alt="Thanh toán tiền mặt"
                  className="w-9 h-9 object-contain"
                />
                <span className="text-gray-800">Thanh toán tiền mặt</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-[15px]">
                <input
                  type="radio"
                  name="payment"
                  value="viettelpay"
                  checked={paymentMethod === 'viettelpay'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio text-blue-500 scale-125"
                />
                <img src="https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png" alt="Viettel Money" className="w-9 h-9" />
                <span className="text-gray-800">Viettel Money</span>
              </label>
            </div>

            <div className="bg-gray-50 p-4 mt-6 rounded-md border border-gray-200">
              <div className="flex items-center text-sm gap-2 text-blue-700 font-medium mb-4">
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icons-promotion-outline.svg"
                  alt="promotion"
                  className="w-5 h-5"
                />
                Ưu đãi thanh toán thẻ/ví
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {promotions.map((promo, index) => (
                  <div
                    key={index}
                    className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex justify-between items-start hover:shadow-md hover:border-blue-300 cursor-pointer transition-all duration-150"
                  >
                    <div>
                      <div className="text-blue-600 font-semibold text-sm">
                        {promo.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {promo.desc}
                      </div>
                      <div className="text-orange-600 text-xs italic mt-1">
                        Không giới hạn
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <img
                        src={promo.logo}
                        alt={`${promo.desc} logo`}
                        className={`object-contain ${promo.desc === "TikiCARD" ? "w-9 h-8" : "w-16 h-auto max-h-8"}`}
                      />
                      <span
                        className="text-gray-400 cursor-help text-sm"
                        title="Xem chi tiết ưu đãi"
                      >
                        ⓘ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="w-full lg:w-1/4 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 font-medium">Giao tới</span>
              <button onClick={() => navigate('/profile')} className="text-blue-600 hover:underline text-sm font-medium">
                Thay đổi
              </button>
            </div>
            {user ? (
              <>
                <p className="font-semibold text-gray-800 text-[15px]">
                  {user.name}
                  {user.phone && (
                    <span className="ml-2 text-[15px] border-l-2 border-gray-300 pl-2">
                      {user.phone}
                    </span>
                  )}
                </p>
                {user.address && user.address.street && user.address.city && user.address.district ? (
                  <p className="text-gray-500 mt-1 text-[15px]">
                    {user.address.street}, {user.address.district}, {user.address.city}
                  </p>
                ) : (
                  <p className="text-red-500 mt-1 text-[15px]">
                    Vui lòng cập nhật địa chỉ đầy đủ.
                    <button onClick={() => navigate('/profile')} className="text-blue-600 hover:underline font-medium ml-1">Cập nhật</button>
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-500 mt-1 text-[15px]">Không có thông tin người dùng.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium text-gray-800">Tiki Khuyến Mãi</p>
              {applicableVouchers.length > 0 && (
                <span className="text-sm text-gray-500">Có thể chọn ({applicableVouchers.length})</span>
              )}
            </div>
            {applicableVouchers.length > 0 ? (
              <div>
                {selectedVoucher ? (
                  <div className="border border-blue-500 bg-blue-50 rounded-lg p-3 flex items-center justify-between mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <img src="/src/images/freeship.png" alt="Free Ship" className="w-12 h-12" />
                      <span className="text-xs font-medium">
                        {selectedVoucher.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeselectVoucher()}
                      className="text-white bg-blue-500 rounded px-3 py-1 text-xs font-medium hover:bg-blue-400 ml-2"
                    >
                      Bỏ chọn
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-3 italic">Bạn chưa chọn voucher nào.</p>
                )}

                <button
                  onClick={handleToggleVoucherList}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 text-sm w-full justify-start" // Changed to w-full and justify-start
                >
                  <FontAwesomeIcon icon={faTicket} className="text-blue-500" />
                  Chọn hoặc nhập mã khác
                  <FontAwesomeIcon icon={faChevronRight} className={`h-3 w-3 ml-auto transition-transform ${isVoucherListVisible ? 'rotate-90' : ''}`} />
                </button>

                {isVoucherListVisible && (
                  <div className="mt-3 space-y-2 border-t pt-3">
                    <div
                      onClick={() => handleVoucherSelection(null)}
                      className={`flex items-center cursor-pointer p-2 border rounded-lg text-sm transition-colors ${selectedVoucher === null ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'}`}
                    >
                      <span className="text-gray-700">Không sử dụng voucher</span>
                      {selectedVoucher === null && <span className="ml-auto text-blue-500 text-xs font-semibold">✓ Đã chọn</span>}
                    </div>
                    {applicableVouchers.map(voucher => (
                      <div
                        key={voucher.id}
                        onClick={() => handleVoucherSelection(voucher)}
                        className={`flex items-center justify-between cursor-pointer p-2 border rounded-lg text-sm transition-colors ${selectedVoucher?.id === voucher.id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}
                      >
                        <span className={`font-medium ${selectedVoucher?.id === voucher.id ? 'text-blue-700' : 'text-gray-800'}`}>
                          {voucher.name}
                        </span>
                        {selectedVoucher?.id === voucher.id && <span className="text-blue-500 text-xs font-semibold">✓ Đã chọn</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Không có voucher phù hợp cho đơn hàng này.</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow sticky top-4">
            <div className="px-4 pt-4 pb-2">
              <h3 className="font-semibold text-lg text-gray-800">Đơn hàng</h3>
              <div className="text-sm text-gray-500 mt-1">
                {totalQuantity} sản phẩm.
              </div>
            </div>
            <hr className="my-2 border-t border-gray-200" />
            <div className="space-y-1.5 text-sm px-4 py-2">
              <div className="flex justify-between text-gray-700">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString("vi-VN")} ₫</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Phí vận chuyển</span>
                <span>{(selectedShippingOption?.originalCost ?? 0).toLocaleString("vi-VN")} ₫</span>
              </div>
              {itemDiscount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Giảm giá sản phẩm</span>
                  <span className="text-green-600">
                    -{itemDiscount.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
              )}
              {totalShippingDiscountDisplay > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    Giảm giá vận chuyển
                    <span className="text-gray-400 cursor-help" title="Bao gồm khuyến mãi và voucher (nếu có)">
                      ⓘ
                    </span>
                  </span>
                  <span className="text-green-600">
                    -{totalShippingDiscountDisplay.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
              )}
              {voucherTotalOrderDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá đơn hàng (Voucher)</span>
                  <span>-{voucherTotalOrderDiscount.toLocaleString("vi-VN")} ₫</span>
                </div>
              )}
            </div>
            <hr className="my-2 border-t border-gray-200" />
            <div className="flex justify-between items-center px-4 pt-2 pb-1">
              <span className="font-medium text-gray-800">Tổng tiền</span>
              <span className="text-red-600 text-xl font-bold">
                {totalPaymentAmount.toLocaleString("vi-VN")} ₫
              </span>
            </div>
            {totalSavings > 0 && (
              <div className="text-green-600 text-right text-sm px-4 pb-2">
                Tiết kiệm {totalSavings.toLocaleString("vi-VN")} ₫
              </div>
            )}
            <p className="text-xs text-gray-500 mb-4 text-right px-4">
              (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
            </p>
            <div className="px-4 pb-4">
              <button
                onClick={handlePlaceOrder}
                className={`w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg text-base font-semibold transition duration-150 ease-in-out ${isPlacingOrder || orderItemsWithDetails.length === 0 || !selectedShippingMethod || !user?.address?.street || !user.address.city || !user.address.district ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isPlacingOrder || orderItemsWithDetails.length === 0 || !selectedShippingMethod || !user?.address?.street || !user.address.city || !user.address.district}
              >
                {isPlacingOrder ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </div>
                ) : (
                  "Đặt hàng"
                )}
              </button>
              {orderErrorMessage && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {orderErrorMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
