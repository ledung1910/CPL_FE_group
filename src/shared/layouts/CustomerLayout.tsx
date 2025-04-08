import { Outlet } from "react-router-dom";
import { useState } from "react";
import Banner from "../component/Banner";
import Header from "../component/Header";
import Footer from "../component/Footer";


const CustomerLayout = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="h-screen flex flex-col">
      <Banner />
      <Header onSearch={(k) => setKeyword(k)} />
      <main className="flex-grow bg-gray-100">
        <Outlet context={{ keyword }} />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
