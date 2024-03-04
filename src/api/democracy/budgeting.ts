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

export const useDeleteBudget = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => {
      return axios
        .delete(`${baseUrl}/budget/remove/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-budgets");
        toast({
          title: "Success",
          description: "Budget deleted",
          variant: "success",
        });
      },
    }
  );
};

export const useGetAllProjectProposals = (
  id: string,
  page: number,
  perPage?: number
) => {
  return useQuery(
    ["all-project-proposals", page, perPage, id],
    (): Promise<ProjectProposalResponse> => {
      return axios
        .get(
          `${baseUrl}/budget/proposals/${id}?page=${page}&perPage=${
            perPage || 10
          }`
        )
        .then((res) => res.data.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetallBudgetPhases = () => {
  return useQuery(
    ["all-budget-phases"],
    (): Promise<BudgetPhaseModule[]> => {
      return axios
        .get(`${baseUrl}/budget/phase-modules`)
        .then((res) => res.data.data.records);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useAssignProject = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (value: AssignBudget) => {
      return axios
        .put(`${baseUrl}/budget/assign-user`, value)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-project-proposals");
        toast({
          title: "Success",
          description: "User Assigned",
          variant: "success",
        });
      },
    }
  );
};
export const useSelectProject = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (value: SelectProjectPayload) => {
      return axios
        .post(`${baseUrl}/budget/add-item`, value)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-project-proposals");
        toast({
          title: "Success",
          description: "User Assigned",
          variant: "success",
        });
      },
    }
  );
};
