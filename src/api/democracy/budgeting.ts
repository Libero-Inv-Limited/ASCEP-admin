import { useMutation, useQueryClient } from "react-query";
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
