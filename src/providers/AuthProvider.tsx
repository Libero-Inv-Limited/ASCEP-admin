import config from "@/utils/config";
import { getStorageItem, setStorageItem, removeStorageItem } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";
import logger from "@/utils/logger";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  email: string;
  token: string;
  setEmail: (arg: string) => void;
  login: (args: LoginResp) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  email: "",
  token: "",
  setEmail: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!getStorageItem(config.key.isLoggedIn)
  );
  const [token] = useState(getStorageItem(STORAGE_KEYS.ACCESS_TOKEN) || "");

  const [email, setEmail] = useState("");

  const login = (args: LoginResp) => {
    try {
      setStorageItem(STORAGE_KEYS.ACCESS_TOKEN, args.accessToken);
      setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, args.refreshToken);
      setStorageItem(config.key.expiresAt, args.expiresAt);
      setStorageItem(config.key.isLoggedIn, "true");

      setIsLoggedIn(true);
      logger.info("User logged in successfully", undefined, "Auth");
    } catch (error) {
      logger.error("Failed to save login data", error as Error, "Auth");
    }
  };

  const logout = () => {
    try {
      removeStorageItem(STORAGE_KEYS.ACCESS_TOKEN);
      removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
      removeStorageItem(config.key.isLoggedIn);
      removeStorageItem(config.key.expiresAt);

      setIsLoggedIn(false);
      logger.info("User logged out successfully", undefined, "Auth");
    } catch (error) {
      logger.error("Failed to clear logout data", error as Error, "Auth");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, email, setEmail, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
