import config from "@/utils/config";
import { getStorageItem } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";

/**
 * Get auth headers for API requests
 * @deprecated Use the apiClient from @/lib/axios instead which handles this automatically
 */
export const configOptions = () => {
  if (typeof window === "undefined") return {};

  const accessToken = getStorageItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return {};
};

export default config;
