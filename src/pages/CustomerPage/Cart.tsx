import React from "react";

const CartPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="p-6 min-h-screen mx-4">
        <h1 className="text-xl font-semibold mb-4">GIỎ HÀNG</h1>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Cart Items */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4 space-y-4">
            {/* Header Row */}
            <div className="hidden lg:flex items-center font-medium text-sm text-gray-600 py-2 mb-5">
              <div className="flex items-center space-x-2 w-1/2">
                <input type="checkbox" className="h-4 w-4" defaultChecked />
                <span>Tất cả (1 sản phẩm)</span>
              </div>
              <div className="w-1/6 text-right">Đơn giá</div>
              <div className="w-1/6 text-right">Số lượng</div>
              <div className="w-1/6 text-right">Thành tiền</div>
              <div className="w-1/6 text-right">🗑</div>
            </div>

            {/* Product Row */}
            <div className="flex items-start lg:items-center py-4 text-sm">
              {/* Checkbox + image + info */}
              <div className="flex items-start space-x-3 w-1/2">
                <input
                  type="checkbox"
                  className="h-4 w-4 mt-1"
                  defaultChecked
                />
                <img
                  src="https://salt.tikicdn.com/cache/280x280/ts/product/9e/29/3a/726d1f171176ef75a5e3b0c1f2b0b903.jpg"
                  alt="Book"
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold">Kinh Dịch (Ngô Tất Tố)</h2>
                  <p className="text-xs text-red-500">
                    Sách không hỗ trợ Bookcare
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="w-1/6 text-right">193.250₫</div>

              {/* Quantity */}
              <div className="w-1/6 flex justify-end ml-auto">
                <div className="flex items-center border rounded w-20 justify-between px-2">
                  <button className="text-gray-500">−</button>
                  <span>1</span>
                  <button className="text-gray-500">+</button>
                </div>
              </div>

              {/* Total */}
              <div className="w-1/6 text-right font-medium">193.250₫</div>

              {/* Delete */}
              <div className="w-1/6 flex justify-end">
                <button className="text-gray-400 hover:text-red-500">🗑</button>
              </div>
            </div>

            {/* Promotion / freeship */}
            <div className="mt-4 text-sm text-gray-500 space-y-1">
              <div className="flex items-center space-x-2">
                <span>🔖</span>
                <span>Thêm mã khuyến mãi của Shop</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🚚</span>
                <span>Freeship 10k đơn từ 45k, Freeship 25k đơn từ 100k</span>
              </div>
            </div>
          </div>

          {/* Right: Tổng tiền + Mua hàng */}
          <div className="w-full lg:w-1/5 bg-white rounded-lg shadow-sm p-4 h-fit">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tổng tiền hàng</span>
              <span className="text-sm">193.250₫</span>
            </div>
            <div className="flex items-center justify-between text-red-500 font-semibold text-lg mb-2">
              <span>Tổng tiền thanh toán</span>
              <span>193.250₫</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              (Đã bao gồm VAT nếu có)
            </p>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium">
              Mua Hàng (1)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
