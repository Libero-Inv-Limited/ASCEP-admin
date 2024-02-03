import { useQuery } from "react-query";
import baseUrl from "./baseUrl";
import axios from "axios";

export const useGetMainAnalytics = () => {
  return useQuery(
    ["main-analytics"],
    (): Promise<MainAnalyticsType> => {
      return axios.get(`${baseUrl}/analytic/main`).then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
