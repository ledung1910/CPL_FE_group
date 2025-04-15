import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password, "Admin");
      const role = localStorage.getItem("admin_role");
      if (role !== "Admin") {
        setError("Bạn không có quyền truy cập trang quản trị.");
        return;
      }
      navigate("/admin");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">🔐 Đăng nhập Quản trị</h2>

        {error && (
          <div className="bg-red-500 text-white px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-4 relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="📧 Email"
            className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6 relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="🔑 Mật khẩu"
            className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all font-semibold"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};


export default AdminLogin;
