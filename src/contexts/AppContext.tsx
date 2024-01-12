import { useGetAllCategories } from "@/api/category";
import { useGetAllSDGs } from "@/api/democracy/debates";
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
}

const AppContext = createContext<AppContextType>({
  fetchingSdgs: false,
  sdgData: [],
  targets: [],
  setTargets: () => {},
  fetchingCategories: false,
  categories: [],
});

export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children }: PropsWithChildren) {
  const { isLoading: fetchingSdgs, data: sdgData, isSuccess } = useGetAllSDGs();
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
