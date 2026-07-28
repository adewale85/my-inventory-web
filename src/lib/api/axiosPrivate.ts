// src/lib/api/client.ts
import axios from "axios";

// 1. Set up your base URL configuration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "") 
  : "";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

// 2. Request Interceptor: Automatically attach the Bearer token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    const isLoginRequest =
      config.url?.includes("/login");

    if (token && !isLoginRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// 3. Response Interceptor: Handle auto-logout on 401 errors globally
apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses straight through
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);











// import { useAuthStore } from "@/zustand/useAuthStore";
// import { showToast } from "@/utils/toastConfig";

// import { handleApiError } from "@/utils/errorHandler";
// import axios from "axios";

// /**
//  * Axios instance for authenticated requests with automatic token refresh
//  */
// export const axiosPrivate = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL as string,
//   headers: { "Content-Type": "application/json" },
//   timeout: 60000,
// });

// // Request interceptor to add authorization header
// axiosPrivate.interceptors.request.use(
//   (config) => {
//     const accessToken = useAuthStore.getState().auth?.accessToken;
//     if (accessToken && !config.headers["Authorization"]) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // Response interceptor to handle token refresh on 401 errors
// axiosPrivate.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (handleApiError(error)) {
//       return Promise.reject(error);
//     }

//     // 🔴 No refresh token → just logout
//     if (error?.response?.status === 401) {
//       const logout = useAuthStore.getState().logout;

//       showToast({
//         msg: "Session expired. Please login again.",
//         type: "ERROR",
//       });

//       logout();
//     }

//     if (error?.response?.status === 403) {
//       showToast({
//         msg: "Access denied. You don't have permission.",
//         type: "ERROR",
//       });
//     }

//     return Promise.reject(error);
//   },
// );
