import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHome } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./Header.css";

const commitments = [
  {
    img: "https://salt.tikicdn.com/ts/upload/96/76/a3/16324a16c76ee4f507d5777608dab831.png",
    text: "100% hàng thật",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/11/09/ec/456a2a8c308c2de089a34bbfef1c757b.png",
    text: "Freeship mọi đơn",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/0b/f2/19/c03ae8f46956eca66845fb9aaadeca1e.png",
    text: "Hoàn 200% nếu hàng giả",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/3a/f4/7d/86ca29927e9b360dcec43dccb85d2061.png",
    text: "30 ngày đổi trả",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/87/98/77/fc33e3d472fc4ce4bae8c835784b707a.png",
    text: "Giao nhanh 2h",
  },
  {
    img: "https://salt.tikicdn.com/ts/upload/6a/81/06/0675ef5512c275a594d5ec1d58c37861.png",
    text: "Giá siêu rẻ",
  },
];

const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="search-container">
          <div className="search-box">
            <img
              className="icon-search"
              src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
              alt="icon-search"
            />
            <input
              type="text"
              className="search-input"
              placeholder="100% hàng thật"
            />
            <button className="search-button">Tìm kiếm</button>
          </div>
          <div className="keywords">
            <span>điện gia dụng</span>
            <span>xe cộ</span>
            <span>mẹ & bé</span>
            <span>khỏe đẹp</span>
            <span>nhà cửa</span>
            <span>sách</span>
            <span>thể thao</span>
            <span>harry potter</span>
            <span>lịch treo tường 2024</span>
            <span>nguyễn nhật ánh</span>
          </div>
        </div>
        <div className="nav-buttons">
          <Link to="/">
            <FaHome className="icon" /> Trang chủ
          </Link>
          <div className="profile-link">
            <Link to="/profile">
              <FaUser className="icon" /> Tài khoản
            </Link>
          </div>
          <Link to="/cart">
            <FaShoppingCart className="icon" />
          </Link>
        </div>
      </div>
      <div className="commitment-container">
        <span className="commitment-title">Cam kết:</span>
        <div className="commitment-list">
          {commitments.map((item, index) => (
            <div className="commitment-item" key={index}>
              <img src={item.img} alt={`icon-${index}`} width="20" height="20" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
