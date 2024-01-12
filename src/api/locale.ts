import { useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";

//GET ALL WARDS
export const useGetAllWards = () => {
  return useQuery(["wards"], (): Promise<WardsType[]> => {
    return axios.get(`${baseUrl}/local/wards`).then((res) => res.data.data);
  });
};
