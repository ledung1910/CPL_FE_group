import { OrderItem } from "../../interfaces";

const CART_KEY = 'cart';

export const getCart = (): OrderItem[] => {
  const cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  return cart;
};

export const saveCart = (cart: OrderItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product: { id: string; list_price: number; quantity: number }): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.book_id === product.id);
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += product.quantity;
  } else {
    cart.push({
      book_id: product.id,
      quantity: product.quantity,
      price: product.list_price
    });
  }
  saveCart(cart);
};

export const updateQuantity = (bookId: string, quantity: number): void => {
  const cart = getCart();
  const updatedCart = cart.map(item =>
    item.book_id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  saveCart(updatedCart);
};

export const removeFromCart = (bookId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.book_id !== bookId);
  saveCart(updatedCart);
  window.dispatchEvent(new Event("cartUpdated"));
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.length;
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};