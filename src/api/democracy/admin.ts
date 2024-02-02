import { useQuery } from "react-query";
import baseUrl from "../baseUrl";
import axios from "axios";

// GET DEMOCRACY ANALYTICS

export const useGetDemocracyAnalytics = () => {
  return useQuery({
    queryKey: ["democracy-analytics"],
    queryFn: (): Promise<DemocracyAnalyticsType> => {
      return axios
        .get(`${baseUrl}/analytic/democracy`)
        .then((res) => res.data.data);
    },
  });
};
