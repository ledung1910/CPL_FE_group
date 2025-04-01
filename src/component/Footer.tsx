import "./footer.css";
import { FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import { AiOutlineApple } from "react-icons/ai";
import { IoLogoGooglePlaystore } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Hỗ trợ khách hàng</h4>
          <p>
            Hotline: <strong>1900-6035</strong>
            <p>(1000 đ/phút, 8-21h kể cả T7, CN)</p>
          </p>
          <ul>
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
        <div className="footer-section">
          <h4>Về Tiki</h4>
          <ul>
            <li>Giới thiệu Tiki</li>
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
        <div className="footer-section">
          <h4>Hợp tác và liên kết</h4>
          <ul>
            <li>Quy chế hoạt động Sàn GDTMĐT</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>
          <h4>Chứng nhận bởi</h4>
          <img src="/images/certification.png" alt="Chứng nhận" />
        </div>
        <div className="footer-section">
          <h4>Phương thức thanh toán</h4>
          <img src="/images/payment-methods.png" alt="Phương thức thanh toán" />
          <h4>Dịch vụ giao hàng</h4>
          <img src="/images/tikinow.png" alt="TikiNow" />
        </div>
        <div className="footer-section">
          <h4>Kết nối với chúng tôi</h4>
          <div className="social-icons">
            <FaFacebook />
            <FaYoutube />
            <FaTiktok />
          </div>
          <h4>Tải ứng dụng trên điện thoại</h4>
          <div className="app-links">
            <AiOutlineApple />
            <IoLogoGooglePlaystore />
          </div>
        </div>
      </div>
      <div className="footer-middle">
        <h4>Công ty TNHH TI KI</h4>
        <p>
          Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí
          Minh
        </p>
        <p>
          Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và
          Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.
        </p>
        <p>
          Hotline: <a href="">1900 6035</a>
        </p>
      </div>
      <div className="footer-bottom">
        <h4>Thương hiệu nổi bật</h4>
        <p>
          vascara / dior / esteelauder / th truemilk / barbie / owen / ensure /
          durex / bioderma / elly / milo / skechers / aldo / triumph / nutifood
          / kindle / nerman / wacom / anessa / yoosee / olay / similac / comfort
          / bitas / shiseido / langfarm / hukan / vichy / fila / tsubaki
        </p>
      </div>
    </footer>
  );
};

export default Footer;
