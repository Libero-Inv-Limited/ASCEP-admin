import { useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";

export const useGetResponseAnalytics = () => {
  return useQuery(
    ["response-analytics"],
    (): Promise<ResponseAnalyticsObj> =>
      axios.get(`${baseUrl}/analytic/response`).then((res) => res.data.data)
  );
};
