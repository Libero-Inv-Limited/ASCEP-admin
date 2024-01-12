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

export const useGetSpecificUserAnalytics = (id: number) => {
  return useQuery(
    ["users-analytics", id],
    (): Promise<UsersData> =>
      axios
        .get(`${baseUrl}/user/activities?type=specific&user_id=${id}`)
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
