import { useEffect, useState } from "react";
import "./HomePage.css";
import Header from "../component/Header";
import Banner from "../component/Banner";
import Footer from "../component/Footer";

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: string;
  description: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api.json") 
      .then((res) => res.json())
      .then((data) => setProducts(data.products)) 
      .catch((err) => console.error("Lỗi API:", err));
  }, []);

  return (
    <>
      <Banner/>
      <Header />  
      <div className="container">
        <h1 className="title">Danh sách sản phẩm</h1>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">{product.originalPrice} $</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default HomePage;
