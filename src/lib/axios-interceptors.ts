/**
 * Global Axios Interceptors Setup
 *
 * This file sets up interceptors on the global axios instance.
 *
 * WHY THIS EXISTS:
 * The legacy API code throughout the app uses bare `axios` imports.
 * Until all API calls are migrated to use apiClient from ./axios.ts,
 * we need to maintain these global interceptors.
 *
 * TODO: Gradually migrate all API calls to use apiClient, then remove this file.
 *
 * @see /src/lib/axios.ts for the new apiClient (recommended for new code)
 */

import axios from "axios";
import { STORAGE_KEYS } from "@/utils/constants";
import { getStorageItem, removeStorageItem } from "@/utils/storage";
import logger from "@/utils/logger";

/**
 * Request Interceptor - Inject Auth Token
 */
axios.interceptors.request.use(
  (config) => {
    const token = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log in development
    if (import.meta.env.DEV) {
      logger.debug(`[Axios Request] ${config.method?.toUpperCase()} ${config.url}`, undefined, "Axios");
    }

    return config;
  },
  (error) => {
    logger.error("Request interceptor error", error, "Axios");
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Handle Errors
 */
axios.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      logger.debug(
        `[Axios Response] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`,
        undefined,
        "Axios"
      );
    }
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    // Handle 401 Unauthorized - logout user
    if (status === 401) {
      logger.warn("401 Unauthorized - Clearing auth tokens", undefined, "Axios");

      // Clear tokens
      removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
      removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);

      // Redirect to login if not already there
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    // Log error in development
    if (import.meta.env.DEV) {
      logger.error(
        `[Axios Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        { status, message, data: error.response?.data },
        "Axios"
      );
    }

    return Promise.reject(error);
  }
);

// Export a dummy value so this can be imported
export const axiosInterceptorsConfigured = true;
