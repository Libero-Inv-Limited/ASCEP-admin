import { PropsWithChildren, createContext, useContext, useState } from "react";

const UserSettingsContext = createContext<UserSettingsContextType>({
  activeOption: "User Profile",
  setActiveOption: () => {},
  twoFactorAuth: false,
  setTwoFactorAuth: () => {},
  timeLimit: 0,
  setTimeLimit: () => {},
});

export const useUserSettingsContext = () => useContext(UserSettingsContext);

export default function UserSettingsProvider({ children }: PropsWithChildren) {
  const [activeOption, setState] = useState<UserSettingsOption>("User Profile");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [timeLimit, setTimeLimit] = useState(0);

  return (
    <UserSettingsContext.Provider
      value={{
        activeOption,
        setActiveOption: setState,
        twoFactorAuth,
        setTwoFactorAuth,
        timeLimit,
        setTimeLimit,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}
