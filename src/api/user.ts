import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const useGetUsersAnalytics = (page: number, perPage?: number) => {
  return useQuery(
    ["users-analytics", page, perPage],
    (): Promise<UsersData> =>
      axios
        .get(`${baseUrl}/user/analytics?page=${page}&perPage=${perPage || 10}`)
        .then((res) => res.data.data)
  );
};

export const useGetUserInfo = (id: string) => {
  return useQuery(
    ["user-info", id],
    (): Promise<UserObj> =>
      axios.get(`${baseUrl}/user/profile/${id}`).then((res) => res.data.data[0])
  );
};

export interface useGetSpecificUserAnalyticsProps {
  id: string;
  page: number;
}

export const useGetSpecificUserAnalytics = ({
  id,
  page,
}: useGetSpecificUserAnalyticsProps) => {
  return useQuery(
    ["users-analytics", id, page],
    (): Promise<UserActivitiesResponse> =>
      axios
        .get(
          `${baseUrl}/user/activities?type=specific&user_id=${id}&page=${page}`
        )
        .then((res) => res.data.data)
  );
};

export const useUpdateUserStatus = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (values: FormData) => {
      return axios
        .put(`${baseUrl}/user/account-status`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("user-info");
        queryClient.invalidateQueries("users-analytics");
        toast({
          title: "Success!",
          variant: "success",
          description: `User account status updated`,
          duration: 2000,
        });
      },
    }
  );
};

export const useDeleteUserAccount = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  return useMutation(
    (id: string | number) => {
      return axios
        .delete(`${baseUrl}/user/account/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        navigate("/users");
        toast({
          title: "Success!",
          variant: "success",
          description: `User account Deleted`,
          duration: 2000,
        });
      },
    }
  );
};

interface ResetUserPasswordPayload {
  password: string;
  user_id: number;
}

export const useResetUserPassword = () => {
  const { toast } = useToast();
  return useMutation(
    (values: ResetUserPasswordPayload) => {
      return axios
        .patch(`${baseUrl}/user/change-user-password`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        toast({
          title: "Success!",
          variant: "success",
          description: `User password reset `,
          duration: 2000,
        });
      },
    }
  );
};
