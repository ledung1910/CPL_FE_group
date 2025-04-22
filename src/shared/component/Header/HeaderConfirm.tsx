import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white top-0 ">
      <div className="ml-6">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" className="h-[90px] w-[110px]" />
          </Link>
        </div>
    </header>
  );
};

export default Header