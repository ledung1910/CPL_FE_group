import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="hidden sm:flex items-center justify-between p-4 bg-white top-0">
      <div className="ml-6">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-[90px] w-[110px]" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center items-start ml-10 pl-10 border-l-2 border-blue-400">
        <h1 className="text-3xl font-medium text-blue-400">Thanh toán</h1>
      </div>
    </header>
  );
};

export default Header;
