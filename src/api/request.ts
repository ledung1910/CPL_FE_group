import { AxiosRequestConfig } from "axios";
import apiClient from "../api/api.client";

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get(url, config);
    return response as T;
};

export const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post(url, data, config);
    return response as T;
};