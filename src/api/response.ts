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
export const useGetAllSurveys = () => {
  return useQuery(
    ["all-surveys"],
    (): Promise<SurveyData[]> => {
      return axios
        .get(`${baseUrl}/survey/all`)
        .then((res) => res.data.data.surveys);
    },
    {
      retry: false,
    }
  );
};

export const useGetSurveyInfo = (id: number | string) => {
  return useQuery(
    ["all-surveys"],
    (): Promise<SurveryInfoData> => {
      return axios
        .get(`${baseUrl}/survey/info/${id}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const useGetReportInfo = (id: string) => {
  return useQuery(
    ["all-activities", id],
    (): Promise<ReportData> => {
      return axios
        .get(`${baseUrl}/report/info/${id}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};
export const useGetReportComments = ({
  id,
  page,
}: GetReportCommentsQueryArgs) => {
  return useQuery(
    ["report-comments", id, page],
    (): Promise<ReportCommentsResponse> => {
      return axios
        .get(`${baseUrl}/report/comments?report=${id}&page=${page}&perPage=2`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const useGetReportCommentsResonponses = ({
  id,
  perPage,
}: GetReportCommentsResonponsesQueryArgs) => {
  return useQuery(
    [id, perPage],
    (): Promise<ReportCommentsResponse> => {
      return axios
        .get(
          `${baseUrl}/report/comment-responses?comment=${id}&perPage=${perPage}`
        )
        .then((res) => res.data.data);
    },
    {
      retry: false,
      enabled: !!id,
    }
  );
};
