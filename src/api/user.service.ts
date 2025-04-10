import apiClient from "./api.client";
import { User } from "../../interfaces";

type LoginPayload = {
  email: string;
  password: string;
}

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
}

type AuthResponse = {
  accessToken: string;
  user: User;
}

const login = async (loginPayload: LoginPayload): Promise<AuthResponse> => {
  return await apiClient.post("/login", loginPayload);
};

const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  return await apiClient.post("/register", payload);
};

const getProfile = async (): Promise<User> => {
  return await apiClient.get("/users/me");
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

const userService = {
  login,
  register,
  getProfile,
  logout,
};

export default userService;
