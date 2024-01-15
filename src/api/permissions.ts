import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { signupSchema } from "@/schemas/AuthSchema";
import { z } from "zod";
import { useAuthContext } from "@/providers/AuthProvider";

export const useCeatePermission = () => {
  const navigate = useNavigate();
  const { setEmail, email } = useAuthContext();

  return useMutation(
    (values: z.infer<typeof signupSchema>) => {
      setEmail(values.email);
      return axios
        .post(`${baseUrl}/user/register`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        navigate("/auth/otp", {
          state: { email, timeLimit: res.data.timeLimit },
        });
      },
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
