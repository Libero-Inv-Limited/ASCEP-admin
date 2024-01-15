import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { createRoleSchema } from "@/schemas/SettingsSchema";

interface WriteRolePayload extends z.infer<typeof createRoleSchema> {
  permissions: string[] | number[];
  id?: number;
}

export const useCreateRole = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: WriteRolePayload) => {
      return axios
        .post(`${baseUrl}/role/create`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-roles");
        toast({
          title: "Success",
          description: "Role Created",
          variant: "success",
        });
      },
    }
  );
};

export const useGetAllRoles = () => {
  return useQuery(
    ["all-roles"],
    (): Promise<Role[]> => {
      return axios.get(`${baseUrl}/role/all`).then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

export const useDeleteRole = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (id: string | number) => {
      return axios
        .delete(`${baseUrl}/role/delete?ids=${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-roles");
        toast({
          title: "Success",
          description: "Role Deleted",
          variant: "success",
        });
      },
    }
  );
};

export const useUpdateRole = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: WriteRolePayload) => {
      return axios
        .patch(`${baseUrl}/role/update`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-roles");
        toast({
          title: "Success",
          description: "Role Updated",
          variant: "success",
        });
      },
    }
  );
};
