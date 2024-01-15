import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useToast } from "@/components/ui/use-toast";

export const useCeatePermission = () => {
  return useMutation(
    (values) => {
      return axios
        .post(`${baseUrl}/user/register`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {},
    }
  );
};

export const useGetAllPermissions = () => {
  return useQuery(
    ["all-permissions"],

    (): Promise<Permission[]> => {
      return axios
        .get(`${baseUrl}/permission/all`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
    }
  );
};

interface AssignPermissionToUserType {
  permissions: string[];
  userId: number;
}

export const useAssignPermissionToUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: AssignPermissionToUserType) => {
      return axios
        .put(`${baseUrl}/permission/assign-to-user`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user-info");
        toast({
          title: "Success",
          description: "User Permissions Updated",
          variant: "success",
        });
      },
    }
  );
};
