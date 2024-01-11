import { useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";

export const useGetUsersAnalytics = (page: number) => {
  return useQuery(
    ["users-analytics", page],
    (): Promise<UsersData> =>
      axios
        .get(`${baseUrl}/user/analytics?page=${page}`)
        .then((res) => res.data.data)
  );
};
