import apiClient from "./api.client";
import { User } from "../../interfaces";

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

type AuthResponse = {
  accessToken: string;
  user: User;
};

const login = async (loginPayload: LoginPayload): Promise<AuthResponse> => {
  return await apiClient.post("/login", loginPayload);
};

const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const payloadWithRole = {
    ...payload,
    role: "User",
  };
  return await apiClient.post("/register", payloadWithRole);
};

const getProfile = async (id: number): Promise<User> => {
  return await apiClient.get(`/users/${id}`);
};

const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  return await apiClient.patch(`/users/${id}`, data);
};

const logout = () => {
  localStorage.removeItem("accessToken");
};

const getAllUsers = async (): Promise<User[]> => {
  return await apiClient.get("/users");
};

const userService = { login, register, getProfile, logout, getAllUsers, updateUser };

export default userService;
