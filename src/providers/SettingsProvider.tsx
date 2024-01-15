import { PropsWithChildren, createContext, useContext, useState } from "react";

const SettingsContext = createContext<SettingsContextType>({
  activeOption: "User Profile",
  setActiveOption: () => {},
  activeTitle: null,
  setActiveTitle: () => {},
  twoFactorAuth: false,
  setTwoFactorAuth: () => {},
  timeLimit: 0,
  setTimeLimit: () => {},
  actionButton: null,
  setActionButton: () => {},
});

export const useSettingsContext = () => useContext(SettingsContext);

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [activeTitle, setActiveTitle] = useState<string | null>(null);
  const [actionButton, setActionButton] = useState<ActionButton | null>(null);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [activeOption, setActiveOption] =
    useState<SettingsOption>("User Profile");

  const [timeLimit, setTimeLimit] = useState(0);

  return (
    <SettingsContext.Provider
      value={{
        activeOption,
        setActiveOption,
        twoFactorAuth,
        setTwoFactorAuth,
        timeLimit,
        setTimeLimit,
        activeTitle,
        setActiveTitle,
        actionButton,
        setActionButton,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
