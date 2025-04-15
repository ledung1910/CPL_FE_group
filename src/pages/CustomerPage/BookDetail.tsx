import { useState, useEffect, useRef } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Book } from "../../../interfaces";
import usePagination from "../../hooks/usePagination";
import { getBooks, getBookById } from "../../api/book.service";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginPopup from "./Login";
import RegisterPopup from "./Register";
import { cartService } from "../../api/cart.service";
import AddToCartSuccessPopup from "../../shared/component/AddtoCartSuccess";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Book | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const { user } = useAuth();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [booksData, bookDetail] = await Promise.all([
          getBooks(),
          getBookById(id),
        ]);

        if (booksData.length === 0) throw new Error("Không có sản phẩm nào");

        setBooks(booksData);
        setProduct(bookDetail);
        setSelectedImage(bookDetail.images[0]?.large_url || "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (!product) return;

    try {
      cartService.addToCart({
        id: product.id,
        list_price: product.current_seller.price,
        quantity: quantity,
      });
      
      window.dispatchEvent(new Event("cartUpdated"));
      setShowPopup(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }

    if (product) {
      const orderItem = {
        id: product.id,
        quantity: quantity,
      };
      localStorage.setItem("latestOrder", JSON.stringify(orderItem));
      navigate("/checkout");
    }
  };

  // ... (Các hàm renderProductGrid, calculateDiscountPercentage giữ nguyên)

  const renderProductGrid = (
    title: string,
    items: Book[],
    currentPage: number,
    totalPages: number,
    onNext: () => void,
    onPrev: () => void,
    onViewMore?: () => void
  ) => (
    <div className="rounded-lg p-4 bg-white mt-6">
      {/* ... (Nội dung giữ nguyên) */}
    </div>
  );

  if (loading) return <div className="max-w-[1400px] mx-auto py-20 text-center">Đang tải...</div>;
  if (error) return <div className="max-w-[1400px] mx-auto py-20 text-center text-red-500">{error}</div>;
  if (!product) return <div className="max-w-[1400px] mx-auto py-20 text-center">Không tìm thấy sản phẩm</div>;

  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4 py-4 px-4">
      {/* Phần ảnh và thông tin sản phẩm giữ nguyên */}

      {/* Phần đặt hàng */}
      <div className="col-span-3 w-full bg-white rounded-lg p-6">
        {/* ... (Các phần khác giữ nguyên) */}

        <div>
          <AddToCartSuccessPopup 
            isOpen={showPopup} 
            onClose={() => setShowPopup(false)} 
          />
          <button
            onClick={handleAddToCart}
            className="w-full border border-blue-500 text-blue-500 hover:bg-blue-50 py-3 rounded-lg mt-2 text-lg font-semibold transition-colors"
          >
            Thêm vào giỏ
          </button>
        </div>

        {!user && (
          <>
            <LoginPopup
              isOpen={isLoginOpen}
              onClose={() => setLoginOpen(false)}
              onSwitchToRegister={() => {
                setLoginOpen(false);
                setRegisterOpen(true);
              }}
            />
            <RegisterPopup
              isOpen={isRegisterOpen}
              onClose={() => setRegisterOpen(false)}
              onSwitchToLogin={() => {
                setRegisterOpen(false);
                setLoginOpen(true);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;