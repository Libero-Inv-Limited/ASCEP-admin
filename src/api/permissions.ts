import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useToast } from "@/components/ui/use-toast";
import { createPermissionSchema } from "@/schemas/SettingsSchema";
import { z } from "zod";

// export const useCeatePermission = () => {
//   return useMutation(
//     (values) => {
//       return axios
//         .post(`${baseUrl}/user/register`, values)
//         .then((res) => res.data);
//     },
//     {
//       onSuccess: () => {},
//     }
//   );
// };

interface WritePermissionPayload extends z.infer<typeof createPermissionSchema> {
  id?: number;
}

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

export const useCreatePermission = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: WritePermissionPayload) => {
      return axios
        .post(`${baseUrl}/permission/create`, values)
        .then((res) => res.data.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-permissions");
        toast({
          title: "Success",
          description: "Permission Created",
          variant: "success",
        });
      },
    }
  );
};

export const useUpdatePermission = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (values: WritePermissionPayload) => {
      return axios
        .patch(`${baseUrl}/permission/update`, values)
        .then((res) => res.data.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("update-permission");
        toast({
          title: "Success",
          description: "Permission Updated",
          variant: "success",
        })
      }
    }
  )
}

export const useDeletePermission = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    (id: string | number) => {
      return axios
        .delete(`${baseUrl}/permission/remove/${id}`)
        .then((res) => res.data.data);
    }, {
    onSuccess: () => {
      queryClient.invalidateQueries("delete-permission");
      toast({
        title: "Success",
        description: "Permission Deleted",
        variant: "success",
      })
    }
  }
  )
}

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
