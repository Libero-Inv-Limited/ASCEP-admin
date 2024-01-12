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

export const useGetAllReports = ({ filtersString }: GetAllReportsQueryArgs) => {
  return useQuery(
    ["all-reports", filtersString],
    (): Promise<ReportData[]> => {
      return axios
        .get(`${baseUrl}/report/all${filtersString}`)
        .then((res) => res.data.data.reports);
    },
    {
      retry: false,
    }
  );
};
