import { useMutation, useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { useToast } from "@/components/ui/use-toast";

export const useGetUsersAnalytics = (page: number) => {
  return useQuery(
    ["users-analytics", page],
    (): Promise<UsersData> =>
      axios
        .get(`${baseUrl}/user/analytics?page=${page}`)
        .then((res) => res.data.data)
  );
};

export const useGetUserInfo = (id: string) => {
  return useQuery(
    ["users-info", id],
    (): Promise<UserObj> =>
      axios.get(`${baseUrl}/user/profile/${id}`).then((res) => res.data.data[0])
  );
};

interface useGetSpecificUserAnalyticsProps {
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

  return useMutation(
    (values: FormData) => {
      return axios
        .put(`${baseUrl}/user/account-status`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
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
  return useMutation(
    (id: string | number) => {
      return axios
        .delete(`${baseUrl}/user/account/${id}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
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
