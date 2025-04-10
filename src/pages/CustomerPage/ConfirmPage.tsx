import React from 'react';

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen bg-[#f5f5fa] py-8 px-4">
      <div className="max-w-[1050px] mx-auto flex gap-4">
        {/* Left Section */}
        <div className="flex-1 bg-white rounded-[8px] overflow-hidden relative">
          {/* Banner */}
          <div className="h-[120px] bg-gradient-to-r from-[#00b5f1] to-[#005bea] relative flex items-start px-4 pt-6">
            {/* Mascot Image */}
            <img
              src="/tiki-ninja.png"
              alt="Tiki Mascot"
              className="absolute left-4 top-2 w-[100px] h-[100px] object-contain z-10"
            />
            {/* Text */}
            <div className="ml-[120px] text-white z-20">
              <h1 className="text-[18px] font-semibold leading-tight">
                Yay, đặt hàng thành công!
              </h1>
              <p className="mt-[4px] text-[14px]">
                Chuẩn bị tiền mặt <span className="underline">110.000 ₫</span>
              </p>
            </div>
          </div>

          {/* Info Rows */}
          <div className="pt-6 pb-8 px-6 pl-[140px]">
            <div className="flex justify-between text-sm text-[#808089] mb-4">
              <span>Phương thức thanh toán</span>
              <span className="text-[#27272a] font-medium">Thanh toán tiền mặt</span>
            </div>
            <div className="flex justify-between text-sm text-[#808089] mb-4">
              <span>Tổng cộng</span>
              <div className="text-right">
                <p className="text-[#27272a] font-semibold text-base">110.000 ₫</p>
                <p className="text-xs text-[#808089]">(Đã bao gồm VAT nếu có)</p>
              </div>
            </div>

            <button className="mt-4 w-full py-[10px] border border-[#0b74e5] text-[#0b74e5] rounded font-medium hover:bg-[#f0f8ff] transition">
              Quay về trang chủ
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[300px] bg-white rounded-[8px] p-4 text-sm shadow-sm">
          {/* Mã đơn hàng */}
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <span className="font-medium text-[#27272a]">Mã đơn hàng: 861979887</span>
            <a href="#" className="text-[#0b74e5] text-sm hover:underline">
              Xem đơn hàng
            </a>
          </div>

          {/* Ngày giao hàng */}
          <p className="text-[#808089] text-xs mb-2">Giao thứ 6, trước 13h, 28/03</p>

          {/* Sản phẩm */}
          <div className="flex items-center gap-3">
            <img
              src="/book.png"
              alt="Sản phẩm"
              className="w-[40px] h-[60px] object-cover border rounded"
            />
            <p className="text-[#27272a] text-sm font-normal leading-[1.3]">Chat GPT Thực Chiến</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
