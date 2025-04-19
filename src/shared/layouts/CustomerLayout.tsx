import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Banner from "../component/Header/Banner";
import Header from "../component/Header/HeaderCustomer";
import Footer from "../component/Footer/FooterCustomer";

const CustomerLayout = () => {
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  const isBookDetailPage = location.pathname.startsWith("/detail/");

  return (
    <div className="min-h-screen flex flex-col">
      <Banner />
      <Header onSearch={(k) => setKeyword(k)} />
      <main className="flex-grow bg-gray-100">
        <Outlet context={{ keyword }} />
      </main>
      <div className={`${isBookDetailPage ? 'hidden md:block' : ''}`}>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerLayout;
