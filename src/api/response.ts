import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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
    ["survey-info"],
    (): Promise<SurveryInfoData> => {
      return axios
        .get(`${baseUrl}/survey/info/${id}`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

// DELETE A REPORT
export const useDeleteReport = () => {
  const { toast } = useToast();
  return useMutation(async (id: number): Promise<ResponseDataType> => {
    return axios.delete(`${baseUrl}/report/delete-report/${id}`).then((res) => res.data);
  },
  {
    onSuccess: (res) => {
      toast({
        title: "Success!",
        variant: "success",
        description: res.message,
      });
    }
  })
}

export const useGetSurveyResponse = ({
  id,
  page,
}: GetReportCommentsQueryArgs) => {
  return useQuery(
    [id, page],
    (): Promise<SurveyResponseResponse> => {
      return axios
        .get(
          `${baseUrl}/survey/question-responses?question_id=${id}&page=${page}&perPage=2`
        )
        .then((res) => res.data.data);
    },
    {
      retry: false,
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetReportInfo = (id: string) => {
  return useQuery(
    ["report-info", id],
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

export const useCreateSurvey = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: CreateSurveyPayload) => {
      return axios
        .post(`${baseUrl}/survey/compose`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("surveys");
        toast({
          title: "Success",
          description: "Survey created, add question",
          variant: "success",
        });
      },
    }
  );
};
export const useAddSurveyQuestion = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(
    (values: any) => {
      return axios
        .put(`${baseUrl}/survey/add-question`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("surveys");
        navigate("/response");
        toast({
          title: "Success",
          description: "Question Added. Survery Creation Complete",
          variant: "success",
        });
      },
    }
  );
};
