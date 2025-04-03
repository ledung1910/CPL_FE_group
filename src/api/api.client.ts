import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER,
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => {
        return response.data?.data || response.data;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);