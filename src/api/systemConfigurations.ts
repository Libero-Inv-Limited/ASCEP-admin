import { useMutation, useQuery, useQueryClient } from "react-query";
import baseUrl from "./baseUrl";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export const useGetAllConfigurations = () => {
  return useQuery(
    ["all-configurations"],

    (): Promise<SystemConfigItem[]> => {
      return axios
        .get(`${baseUrl}/config/all`)
        .then((res) => res.data.data.settings);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useUpdateConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: UpdateSystemConfigPayload) => {
      return axios
        .post(`${baseUrl}/config/update/`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("all-configurations");

        toast({
          title: "Success!",
          variant: "success",
          description: `Configuration updated successfully`,
        });
      },
    }
  );
};

export const useGetPlatformModules = () => {
  return useQuery(
    ["platform-modules"],

    (): Promise<PlatformModuleItem[]> => {
      return axios
        .get(`${baseUrl}/config/all-modules`)
        .then((res) => res.data.data);
    },
    {
      retry: false,
      // refetchOnWindowFocus: false,
    }
  );
};

export const useToggleModule = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation(
    (values: TogglePlatformModulePayload) => {
      return axios
        .patch(`${baseUrl}/config/toggle-module/`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("platform-modules");

        toast({
          title: "Success!",
          variant: "success",
          description: `Module Visibility updated successfully`,
        });
      },
    }
  );
};
