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

export const useGetReportTrendOverTime = (date: string) => {
  return useQuery(
    ["report-trend", date],
    (): Promise<ReportTrend[]> => {
      return axios
        .get(`${baseUrl}/analytic/report-trend/${date}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};
export const useGetSurveyTrendOverTime = (date: string) => {
  return useQuery(
    ["survey-trend", date],
    (): Promise<SurveyTrend[]> => {
      return axios
        .get(`${baseUrl}/analytic/survey-trend/${date}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};
export const useGetProposalsOverTime = (date: string) => {
  return useQuery(
    ["proposal-trend", date],
    (): Promise<ProposalTrend[]> => {
      return axios
        .get(`${baseUrl}/analytic/proposal-trend/${date}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};
