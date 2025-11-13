/**
 * Axios Instance Configuration
 *
 * Centralized axios instance with interceptors for:
 * - Automatic token injection
 * - Response error handling
 * - Request/response logging in development
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import baseUrl from "@/api/baseUrl";
import config from "@/api/config";
import { toast } from "@/components/ui/use-toast";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor
 * Automatically injects authentication token from localStorage
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles common error scenarios and token expiration
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    }
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as any)?.message || error.message;

    // Handle different error status codes
    switch (status) {
      case 401:
        // Unauthorized - clear auth and redirect to login
        localStorage.removeItem(config.key.accessToken);
        localStorage.removeItem(config.key.refreshToken);

        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });

        // Redirect to login page
        if (window.location.pathname !== "/auth/login") {
          window.location.href = "/auth/login";
        }
        break;

      case 403:
        // Forbidden
        toast({
          title: "Access Denied",
          description: "You don't have permission to perform this action.",
          variant: "destructive",
        });
        break;

      case 404:
        // Not Found
        toast({
          title: "Not Found",
          description: message || "The requested resource was not found.",
          variant: "destructive",
        });
        break;

      case 422:
        // Validation Error
        toast({
          title: "Validation Error",
          description: message || "Please check your input and try again.",
          variant: "destructive",
        });
        break;

      case 500:
        // Server Error
        toast({
          title: "Server Error",
          description: "An error occurred on the server. Please try again later.",
          variant: "destructive",
        });
        break;

      default:
        // Generic error handling
        if (error.code === "ECONNABORTED") {
          toast({
            title: "Request Timeout",
            description: "The request took too long. Please try again.",
            variant: "destructive",
          });
        } else if (!error.response) {
          toast({
            title: "Network Error",
            description: "Please check your internet connection and try again.",
            variant: "destructive",
          });
        }
    }

    // Log errors in development
    if (import.meta.env.DEV) {
      console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status,
        message,
        data: error.response?.data,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
