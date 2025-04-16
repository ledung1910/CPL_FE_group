import { useEffect } from "react";

type AddToCartSuccessPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddToCartSuccessPopup: React.FC<AddToCartSuccessPopupProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 2000); // Tự động đóng sau 2s
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
      ✅ Đã thêm sản phẩm vào giỏ hàng!
    </div>
  );
};

export default AddToCartSuccessPopup;
