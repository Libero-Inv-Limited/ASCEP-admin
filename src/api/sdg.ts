import { useMutation, useQuery, useQueryClient } from "react-query";
import baseUrl from "./baseUrl";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { AddSDGTargetSchema } from "@/schemas/democracySchema";

export const useGetAllSDGs = () => {
  return useQuery(
    ["all-sdgs"],
    (): Promise<SDGData[]> => {
      return axios.get(`${baseUrl}/sdg/all`).then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const useCreateSDG = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: FormData) => {
      return axios.post(`${baseUrl}/sdg/make`, values).then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-sdgs");
        toast({
          title: "Success",
          description: "SDG Created",
          variant: "success",
        });
      },
    }
  );
};

interface ADDSDGTargetPayload extends AddSDGTargetSchema {
  sdgs_id: number;
}

export const useAddSDGTarget = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: ADDSDGTargetPayload) => {
      return axios
        .post(`${baseUrl}/sdg/make-targets`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-sdgs");
        toast({
          title: "Success",
          description: "SDG Target Added",
          variant: "success",
        });
      },
    }
  );
};

export const useDeleteSDG = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => {
      return axios
        .delete(`${baseUrl}/sdg/remove/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-sdgs");
        toast({
          title: "Success",
          description: "SDG Deleted",
          variant: "success",
        });
      },
    }
  );
};
