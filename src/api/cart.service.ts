// cart.service.ts

import { CartItem } from "../../interfaces";

const CART_KEY = 'cart'; // key để lưu trữ giỏ hàng trong localStorage

// Lấy giỏ hàng từ localStorage
const getCart = (): CartItem[] => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  return cart;
};

// Lưu giỏ hàng vào localStorage
const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Thêm sản phẩm vào giỏ
const addToCart = (product: { id: string; list_price: number; quantity: number }): void => {
    const cart = getCart();
  
    const existingItemIndex = cart.findIndex(item => item.book_id === product.id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += product.quantity;
    } else {
      cart.push({
        book_id: product.id,
        quantity: product.quantity,
        price: product.list_price,
      });
    }
  
    saveCart(cart);
  };
  

// Cập nhật số lượng sản phẩm trong giỏ
const updateQuantity = (bookId: string, quantity: number): void => {
  const cart = getCart();

  const updatedCart = cart.map(item =>
    item.book_id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
  );

  saveCart(updatedCart);
};

// Xóa sản phẩm khỏi giỏ
const removeFromCart = (bookId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.book_id !== bookId);
  saveCart(updatedCart);
  window.dispatchEvent(new Event("cartUpdated"));
};

// Xóa tất cả sản phẩm trong giỏ
const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

// Tổng số sản phẩm trong giỏ
const getCartCount = (): number => {
    const cart = getCart();
    return cart.length; 
  };

// Tổng giá trị giỏ hàng
const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const cartService = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getCartCount,
  getCartTotal,
  saveCart
};
