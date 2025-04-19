import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ArrowLeft } from "lucide-react";
import { IoClose } from 'react-icons/io5';

interface RegisterPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterPopup: React.FC<RegisterPopupProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setFullName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [isOpen]);

  const handleRegister = async () => {
    if (!fullName || !phone || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin vào các trường');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }
    try {
      await register(fullName, email, password, phone);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại');
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex flex-col md:flex-row w-full max-w-xl md:max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <IoClose />
        </button>

        <div className="w-full md:w-2/3 p-6">
          <button onClick={onSwitchToLogin} className="text-gray-500 mb-4">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-semibold">Tạo tài khoản</h2>
          <p className="text-gray-500">Nhập thông tin để đăng ký</p>

          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onKeyDown={handleKeyDown}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
            required
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onKeyDown={handleKeyDown}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onKeyDown={handleKeyDown}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onKeyDown={handleKeyDown}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
            required
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            onKeyDown={handleKeyDown}
            onClick={handleRegister}
            className="w-full mt-6 p-3 bg-red-500 text-white rounded-sm hover:bg-red-600"
          >
            Đăng ký
          </button>
        </div>

        <div className="hidden md:flex w-1/3 flex-col items-center justify-center bg-blue-100 p-6 text-center">
          <img
            src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
            alt="Tiki Bot"
            className="mb-4 h-36 w-36"
          />
          <p className="text-lg font-semibold text-blue-600">Mua sắm tại Tiki</p>
          <p className="text-sm text-blue-600">Siêu ưu đãi mỗi ngày</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
