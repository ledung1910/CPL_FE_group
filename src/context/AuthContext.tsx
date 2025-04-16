/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import userService from "../api/user.service";
import { cartService } from "../api/cart.service";
import { User } from "../../interfaces";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: "Admin" | "User") => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: (role: "Admin" | "User") => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 phút
  let inactivityTimer: ReturnType<typeof setTimeout>;

  // Reset timer khi có tương tác
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if (user?.role === "User") {
        toast.warning("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        logout("User");
        navigate("/");
      }
    }, INACTIVITY_LIMIT);
  };

  // Theo dõi tương tác người dùng
  useEffect(() => {
    if (user?.role === "User") {
      const events = ["mousemove", "keydown", "scroll", "click"];
      events.forEach((event) => window.addEventListener(event, resetInactivityTimer));
      resetInactivityTimer();

      return () => {
        events.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
        clearTimeout(inactivityTimer);
      };
    }
  }, [user]);

  // Lấy thông tin user nếu đã đăng nhập
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("customer_userId");
        if (!userId) return;

        const profile = await userService.getProfile(Number(userId));
        const role = profile.role ?? "User";

        localStorage.setItem("customer_role", role);
        setUser({ ...profile, role });
      } catch (error) {
        console.log("Lỗi lấy thông tin user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("customer_accessToken");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, role: "Admin" | "User") => {
    try {
      const response = await userService.login({ email, password });
      const { accessToken, user } = response;
      const userRole = user.role ?? "User";

      if (role === "Admin") {
        localStorage.setItem("admin_accessToken", accessToken);
        localStorage.setItem("admin_userId", user.id.toString());
        localStorage.setItem("admin_role", userRole);
      } else {
        localStorage.setItem("customer_accessToken", accessToken);
        localStorage.setItem("customer_userId", user.id.toString());
        localStorage.setItem("customer_role", userRole);
      }

      setUser({ ...user, role: userRole });
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        throw new Error("Sai email hoặc mật khẩu. Vui lòng thử lại.");
      }
      throw new Error("Đăng nhập thất bại. Vui lòng thử lại sau.");
    }
  };

  const register = async (name: string, email: string, password: string, phone: string) => {
    const { accessToken, user } = await userService.register({ name, email, password, phone });
    const role = user.role ?? "User";

    localStorage.setItem("customer_accessToken", accessToken);
    localStorage.setItem("customer_userId", user.id.toString());
    localStorage.setItem("customer_role", role);

    setUser({ ...user, role });
  };

  const logout = (role: "Admin" | "User") => {
    if (role === "Admin") {
      localStorage.removeItem("admin_accessToken");
      localStorage.removeItem("admin_userId");
      localStorage.removeItem("admin_role");
    } else {
      localStorage.removeItem("customer_accessToken");
      localStorage.removeItem("customer_userId");
      localStorage.removeItem("customer_role");
      cartService.clearCart();
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, useAuth };
