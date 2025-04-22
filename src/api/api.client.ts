import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
}, function (error) {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(function (response) {
    if (response.data) {
        return response.data;
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default apiClient;
