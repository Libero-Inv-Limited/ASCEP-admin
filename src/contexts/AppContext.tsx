import { useGetUserProfile } from "@/api/auth";
import { useGetAllCategories } from "@/api/category";
import { useGetAllSDGs } from "@/api/democracy/debates";
import { useGetAllWards } from "@/api/locale";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AppContextType {
  fetchingSdgs: boolean;
  sdgData: SDGsType[];
  user: UserData | null;
  fetchingUser: boolean;
  targets: SDGTarget[];
  setTargets: React.Dispatch<React.SetStateAction<SDGTarget[]>>;
  fetchingCategories: boolean;
  categories: CategoryType[];
  wards: WardsType[];
  fetchingWards: boolean;
}

const AppContext = createContext<AppContextType>({
  fetchingSdgs: false,
  sdgData: [],
  targets: [],
  setTargets: () => {},
  fetchingCategories: false,
  categories: [],
  wards: [],
  fetchingWards: false,
  fetchingUser: false,
  user: null,
});

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: PropsWithChildren) {
  const { isLoading: fetchingSdgs, data: sdgData, isSuccess } = useGetAllSDGs();
  const { isLoading: fetchingWards, data: wards } = useGetAllWards();

  const [targets, setTargets] = useState<SDGTarget[]>([]);
  const { isLoading: fetchingCategories, data: categories } =
    useGetAllCategories();

  const [user, setUser] = useState<UserData | null>(null);

  const { data, isLoading: fetchingUser } = useGetUserProfile();
  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      const newTargets: SDGTarget[] = [];
      if (sdgData) {
        sdgData.forEach((sdg: SDGsType) => {
          newTargets.push(...sdg.sdgTarget);
        });
      }
      setTargets(newTargets);
    }
  }, [isSuccess, sdgData]);
  return (
    <AppContext.Provider
      value={{
        sdgData,
        fetchingSdgs,
        setTargets,
        targets,
        categories: categories ?? [],
        fetchingCategories,
        wards: wards ?? [],
        fetchingWards,
        user,
        fetchingUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
