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
});

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: PropsWithChildren) {
  const { isLoading: fetchingSdgs, data: sdgData, isSuccess } = useGetAllSDGs();
  const { isLoading: fetchingWards, data: wards } = useGetAllWards();

  const [targets, setTargets] = useState<SDGTarget[]>([]);
  const { isLoading: fetchingCategories, data: categories } =
    useGetAllCategories();

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
