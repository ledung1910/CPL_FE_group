import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft } from "lucide-react";

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/30 pt-20 z-1000">
      <button className="absolute top-[5rem] right-[calc(50%-390px)] bg-white rounded-full p-4 w-12 h-12 shadow-lg z-10"
        onClick={onClose}>
        <i className="fa fa-times text-gray-500 text-3xl"></i>
      </button>

      <div className="bg-white w-[780px] rounded-2xl shadow-lg h-auto flex">
        <div className="w-2/3 p-6">
          <button onClick={onSwitchToLogin} className="text-gray-500 mb-4">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-semibold">Tạo tài khoản</h2>
          <p className="text-gray-500">Nhập thông tin để đăng ký</p>

          <input
            type="text"
            placeholder="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mt-4 p-2 border-b border-gray-300"
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button onClick={handleRegister}
            className="w-full mt-6 p-3 bg-red-500 text-white rounded-sm hover:bg-red-600">
            Đăng ký
          </button>
        </div>

        <div className="w-1/3 bg-blue-100 flex flex-col items-center justify-center text-center p-4">
          <img
            src="https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png"
            alt="Tiki Bot"
            className="w-40 h-40 mb-3"
          />
          <p className="text-blue-600 font-semibold text-xl">Mua sắm tại Tiki</p>
          <p className="text-blue-600">Siêu ưu đãi mỗi ngày</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
