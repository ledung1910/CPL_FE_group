import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { cartService } from "../../api/cart.service";
import { getBookById } from "../../api/book.service";
import { OrderItem } from "../../../interfaces";
import { useNavigate } from "react-router-dom";

interface BookDetails {
  name: string;
  image: string;
  price: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [bookDetails, setBookDetails] = useState<Record<string, BookDetails>>({}); // Store book details by id

  useEffect(() => {
    const storedCart = cartService.getCart();
    setCartItems(storedCart);

    // Load book details for each book in the cart
    const fetchBookDetails = async () => {
      const details: Record<string, BookDetails> = {};

      // Fetch book details for each item in the cart
      for (const item of storedCart) {
        const book = await getBookById(item.book_id);
        details[item.book_id] = {
          name: book.name,
          image: book.images[0]?.large_url || "",
          price: book.current_seller.price,
        };
      }

      setBookDetails(details);
    };

    fetchBookDetails();
  }, []);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    cartService.saveCart(updatedCart);
  };

  const handleDeleteItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    cartService.saveCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const navigate = useNavigate();

  const handleCheckout = () => {
    cartService.clearCart();
    navigate('/checkout', { state: { cartItems } });
  };

  return (
    <div className="bg-gray-100">
      <div className="p-6 min-h-screen mx-4">
        <h1 className="text-xl font-semibold mb-4">GIỎ HÀNG</h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-4 space-y-4">
            {cartItems.length === 0 ? (
              <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
              <>
                <div className="hidden lg:flex items-center font-medium text-sm text-gray-600 py-2 mb-5">
                  <div className="flex items-center space-x-2 w-1/2">
                    <input type="checkbox" className="h-4 w-4" defaultChecked />
                    <span>Tất cả ({cartItems.length} sản phẩm)</span>
                  </div>
                  <div className="w-1/6 text-right">Đơn giá</div>
                  <div className="w-1/6 text-right">Số lượng</div>
                  <div className="w-1/6 text-right">Thành tiền</div>
                  <div className="w-1/6 text-right">🗑</div>
                </div>

                {cartItems.map((item, index) => {
                  const details = bookDetails[item.book_id];
                  if (!details) return null; // Skip rendering if details not loaded yet

                  return (
                    <div key={item.book_id} className="flex items-start lg:items-center py-4 text-sm">
                      <div className="flex items-start space-x-3 w-1/2">
                        <input type="checkbox" className="h-4 w-4 mt-1" defaultChecked />
                        <img
                          src={details.image}
                          alt={details.name}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <h2 className="font-semibold">{details.name}</h2>
                        </div>
                      </div>

                      <div className="w-1/6 text-right">{details.price.toLocaleString()}₫</div>

                      <div className="w-1/6 flex justify-end ml-auto">
                        <div className="flex items-center border rounded w-20 justify-between px-2">
                          <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>
                            <FaMinus size={12} className="text-gray-500" />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>
                            <FaPlus size={12} className="text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="w-1/6 text-right font-medium">
                        {(details.price * item.quantity).toLocaleString()}₫
                      </div>

                      <div className="w-1/6 flex justify-end">
                        <button onClick={() => handleDeleteItem(index)}>
                          <FaTrash className="text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Total Summary */}
          <div className="w-full lg:w-1/5 bg-white rounded-lg shadow-sm p-4 h-fit">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Tổng tiền hàng</span>
              <span className="text-sm">{total.toLocaleString()}₫</span>
            </div>
            <div className="flex items-center justify-between text-red-500 font-semibold text-lg mb-2">
              <span>Tổng tiền thanh toán</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              (Đã bao gồm VAT nếu có)
            </p>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
              onClick={handleCheckout}>
              Mua Hàng ({cartItems.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
