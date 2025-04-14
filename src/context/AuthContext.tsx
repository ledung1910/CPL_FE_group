import React, { createContext, useContext, useEffect, useState } from "react";
import userService from "../api/user.service";
import { User } from "../../interfaces";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        const profile = await userService.getProfile(Number(userId));
        const role = profile.role ?? "User";
        localStorage.setItem("role", role);
        setUser({ ...profile, role });
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await userService.login({ email, password });
      const { accessToken, user } = response;
      const role = user.role ?? "User";

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", user.id.toString());
      localStorage.setItem("role", role);

      setUser({ ...user, role });
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

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", user.id.toString());
    localStorage.setItem("role", role);

    setUser({ ...user, role });
  };

  const logout = () => {
    userService.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
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
