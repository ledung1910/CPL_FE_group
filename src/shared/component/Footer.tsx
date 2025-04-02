const Footer = () => {
  return (
    <footer className="py-5 bg-white text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/5 px-1 mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-2">Hỗ trợ khách hàng</h4>
          <p>
            Hotline: <strong>1900-6035</strong>
          </p>
          <p className="text-xs whitespace-nowrap">(1000 đ/phút, 8-21h kể cả T7, CN)</p>
          <ul className="mt-2 space-y-1 text-xs">
            <li>Các câu hỏi thường gặp</li>
            <li>Gửi yêu cầu hỗ trợ</li>
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Hướng dẫn trả góp</li>
            <li>Chính sách hàng nhập khẩu</li>
            <li>Hỗ trợ khách hàng: hotro@tiki.vn</li>
            <li>Báo lỗi bảo mật: security@tiki.vn</li>
          </ul>
        </div>

        <div className="w-full md:w-1/5 px-1 mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-2">Về Tiki</h4>
          <ul className="space-y-1 text-xs">
            <li>Giới thiệu Tiki</li>
            <li>Tiki Blog</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật thanh toán</li>
            <li>Chính sách bảo mật thông tin cá nhân</li>
            <li>Chính sách giải quyết khiếu nại</li>
            <li>Điều khoản sử dụng</li>
            <li>Giới thiệu Tiki Xu</li>
            <li>Tiếp thị liên kết cùng Tiki</li>
            <li>Bán hàng doanh nghiệp</li>
            <li>Điều kiện vận chuyển</li>
          </ul>
        </div>

        <div className="w-full md:w-1/5 px-1 mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-2">Hợp tác và liên kết</h4>
          <ul className="space-y-1 text-xs">
            <li>Quy chế hoạt động Sàn GDTMĐT</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>
          <h4 className="text-lg font-bold mt-4">Chứng nhận bởi</h4>
          <div className="flex space-x-2 mt-2">
            <img src="/src/images/dauvantay.png" alt="Chứng nhận" className="h-10" />
            <img src="/src/images/dadangky.png" alt="Đã Đăng Ký" className="h-10" />
            <img src="/src/images/khoa.png" alt="Khoá" className="h-10" />
          </div>
        </div>

        <div className="w-full md:w-1/5 px-1 mb-6 md:mb-0">
          <h4 className="text-lg font-bold mb-2 whitespace-nowrap">Phương thức thanh toán</h4>
          <div className="flex flex-wrap gap-4">
            <img src="/src/images/tiki.png" alt="Tiki" className="w-1/8" />
            <img src="/src/images/visa.png" alt="Visa" className="w-1/8" />
            <img src="/src/images/mastercard.png" alt="Mastercard" className="w-1/8" />
            <img src="/src/images/jcb.png" alt="JCB" className="w-1/8" />
            <img src="/src/images/atm.png" alt="ATM" className="w-1/8" />

            <img src="/src/images/momo.png" alt="Momo" className="w-1/8" />
            <img src="/src/images/zalopay.png" alt="ZaloPay" className="w-1/8" />
            <img src="/src/images/viettelmoney.png" alt="Viettel Money" className="w-1/8" />
            <img src="/src/images/vnpay.png" alt="VNPay" className="w-1/8" />
            <img src="/src/images/cash.png" alt="Cash" className="w-1/8" />

            <img src="/src/images/tragop.png" alt="Trả góp" className="w-1/8" />
          </div>
          <h4 className="text-lg font-bold mt-4">Dịch vụ giao hàng</h4>
          <img src="/src/images/tikinow.png" alt="TikiNow" className="mt-2 w-1/2" />
        </div>


        <div className="w-full md:w-1/5 px-1 mb-6 md:mb-0">
          <h4 className="text-xl font-bold mb-2">Kết nối với chúng tôi</h4>
          <div className="flex space-x-4 text-2xl">
            <img src="/src/images/fb.png" alt="Facebook" className="cursor-pointer w-1/6" />
            <img src="/src/images/yt.png" alt="Youtube" className="cursor-pointer w-1/6" />
            <img src="/src/images/zalo.png" alt="Zalo" className="cursor-pointer w-1/6" />
          </div>

          <div className="space-y-4 col-span-2">
            <h4 className="text-lg font-bold mb-2">Tải ứng dụng trên điện thoại</h4>
            <div className="flex space-x-4">
              <img src="/src/images/qrcode.png" alt="QRCode" className="cursor-pointer w-1/2" />
              <div className="flex flex-col space-y-2 w-1/2">
                <img src="/src/images/apple.png" alt="Apple" className="cursor-pointer w-full h-full" />
                <img src="/src/images/chplay.png" alt="CHPlay" className="cursor-pointer w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-left text-xs text-gray-600 border-t border-gray-300 pt-4 max-w-7xl mx-auto px-4">
        <h4 className="font-bold">Công ty TNHH TI KI</h4>
        <p>Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, TP Hồ Chí Minh</p>
        <p>
          Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở KH&ĐT TP Hồ
          Chí Minh cấp lần đầu vào ngày 06/01/2010.
        </p>
        <p>Hotline: <a href="tel:19006035" className="text-blue-500">1900 6035</a></p>
      </div>

      <div className="mt-8 text-left text-xs text-gray-600 border-t border-gray-300 pt-4 max-w-7xl mx-auto px-4">
        <h4 className="font-bold">Thương hiệu nổi bật</h4>
        <p className="text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
          vascara / dior / esteelauder / th truemilk / barbie / owen / ensure /
          durex / bioderma / elly / milo / skechers / aldo / triumph / nutifood /
          kindle / nerman / wacom / anessa / yoosee / olay / similac / comfort /
          bitas / shiseido / langfarm / hukan / vichy / fila / tsubaki
        </p>
      </div>
    </footer>
  );
};

export default Footer;
