import { useGetUserInfo } from "@/api/user";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useParams } from "react-router-dom";

const UserSettingsContext = createContext<UserSettingsContextType>({
  activeOption: "User Profile",
  setActiveOption: () => {},
  twoFactorAuth: false,
  setTwoFactorAuth: () => {},
  timeLimit: 0,
  setTimeLimit: () => {},
  userObj: undefined,
  fetchingUserObj: false,
});

export const useUserSettingsContext = () => useContext(UserSettingsContext);

export default function UserSettingsProvider({ children }: PropsWithChildren) {
  const [activeOption, setState] = useState<UserSettingsOption>("User Profile");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const [timeLimit, setTimeLimit] = useState(0);

  const { userId } = useParams();

  const { data: userObj, isLoading: fetchingUserObj } = useGetUserInfo(userId!);

  // console.log(userObj);
  return (
    <UserSettingsContext.Provider
      value={{
        activeOption,
        setActiveOption: setState,
        twoFactorAuth,
        setTwoFactorAuth,
        timeLimit,
        setTimeLimit,
        userObj,
        fetchingUserObj,
      }}
    >
      {children}
    </UserSettingsContext.Provider>
  );
}
