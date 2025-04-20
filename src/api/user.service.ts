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

export const loginService = async (loginPayload: LoginPayload): Promise<AuthResponse> => {
  return await apiClient.post("/login", loginPayload);
};

export const registerService = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const payloadWithRole = {
    ...payload,
    role: "User",
  };
  return await apiClient.post("/register", payloadWithRole);
};

export const getProfile = async (id: number): Promise<User> => {
  return await apiClient.get(`/users/${id}`);
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  return await apiClient.patch(`/users/${id}`, data);
};

export const getAllUsers = async (): Promise<User[]> => {
  return await apiClient.get("/users");
};
