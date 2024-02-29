import { useMutation, useQuery, useQueryClient } from "react-query";
import baseUrl from "../baseUrl";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export const useCreateBudgetSchema = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: CreateBudgetPayload) => {
      return axios
        .post(`${baseUrl}/budget/compose`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-budgets");
        toast({
          title: "Success",
          description: "Budget Created",
          variant: "success",
        });
      },
    }
  );
};

export const useGetAllBudgets = (page: number, perPage?: number) => {
  return useQuery(
    ["all-budgets", page, perPage],
    (): Promise<BudgetsResponse> => {
      return axios
        .get(`${baseUrl}/budget/all?page=${page}&perPage=${perPage || 10}`)
        .then((res) => res.data.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useUpdateBudgetStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: UpdateBudgetPayload) => {
      return axios
        .patch(`${baseUrl}/budget/update-status`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-budgets");
        toast({
          title: "Success",
          description: "Budget Updated",
          variant: "success",
        });
      },
    }
  );
};
