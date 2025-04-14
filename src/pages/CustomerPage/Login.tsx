import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { IoClose } from 'react-icons/io5';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setError('');
    }
  }, [isOpen]);

  const handleLogin = async () => {
    setError('');
    try {
      await login(email, password, "User");
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err.message || 'Đăng nhập thất bại';
      if (message.toLowerCase().includes('unauthorized')) {
        setError('Sai email hoặc mật khẩu. Vui lòng thử lại.');
      } else {
        setError(message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative flex w-[780px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          <IoClose />
        </button>

        {/* Login form */}
        <div className="flex w-2/3 flex-col justify-center p-8">
          <h2 className="text-2xl font-bold mb-2">Đăng nhập bằng email</h2>
          <p className="mb-6 text-gray-500">Nhập email và mật khẩu tài khoản Tiki</p>

          <input
            type="email"
            placeholder="abc@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border-b p-2 mt-4 ${
              error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none`}
          />

          <div className="relative mb-2">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border-b p-2 mt-4 ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-blue-600"
            >
            </button>
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <button
            onClick={handleLogin}
            className="mt-6 w-full rounded-md bg-red-500 p-3 text-white transition hover:bg-red-600"
          >
            Đăng nhập
          </button>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <a href="#" className="text-blue-700 hover:underline">Quên mật khẩu?</a>
            <span>
              Chưa có tài khoản?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToRegister();
                }}
                className="text-blue-700 hover:underline"
              >
                Tạo tài khoản
              </a>
            </span>
          </div>
        </div>

        {/* Right image section */}
        <div className="flex w-1/3 flex-col items-center justify-center bg-blue-100 p-6 text-center">
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

export default LoginPopup;
