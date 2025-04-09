import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white top-0 ">
      <div className="ml-6">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-[90px] w-[110px]" />
          </Link>
        </div>
    </header>
  );
};

export default Header