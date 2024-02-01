import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "axios";
import {
  CREATE_AUTHORITY,
  DELETE_AUTHORITY,
  GET_ALL_AUTHORITIES_ENDPOINT,
  GET_AUTHORITY_INFO_ENDPOINT,
  SEARCH_AUTHORITIES_ENDPOINT,
} from "./endpoints/authorities";
import { useToast } from "@/components/ui/use-toast";
import { CreateAuthoritySchema } from "@/schemas/dialogueSchemas";

// GET ALL AUTHORITIES
export const useGetAllAuthorities = () => {
  return useQuery({
    queryKey: ["authorities"],
    queryFn: (): Promise<AuthorityType[]> => {
      return axios
        .get(GET_ALL_AUTHORITIES_ENDPOINT)
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });
};

// GET AUTHORITY INFO
export const useGetAuthorityInfo = (authorityId: string) => {
  return useQuery({
    queryKey: ["authority-info"],
    queryFn: (): Promise<AuthorityDataType> => {
      return axios
        .get(GET_AUTHORITY_INFO_ENDPOINT(authorityId))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// SEARCH AUTHORITIES
export const useSearchAuthorities = (searchTerm: string) => {
  return useQuery({
    queryKey: ["all-authorities"],
    queryFn: (): Promise<AuthorityType[]> => {
      return axios
        .get(SEARCH_AUTHORITIES_ENDPOINT(searchTerm))
        .then((res) => res.data.data);
    },
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

interface CreateAuthorityPayload extends CreateAuthoritySchema {
  id?: string;
}

export const useCeateAuthority = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  let isEdit = false;
  return useMutation(
    (values: CreateAuthorityPayload) => {
      if (values?.id) isEdit = true;
      return axios.post(CREATE_AUTHORITY, values).then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("authorities");
        queryClient.invalidateQueries("all-authorities");
        queryClient.invalidateQueries("authority-info");
        toast({
          title: "Success!",
          variant: "success",
          description: `Authority ${isEdit ? "Updated" : "Added"}`,
          duration: 2000,
        });
      },
    }
  );
};

export const useDeleteAuthority = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    (id: string) => {
      return axios.delete(DELETE_AUTHORITY(id)).then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("authorities");
        toast({
          title: "Success!",
          variant: "success",
          description: `Authority Deleted`,
          duration: 2000,
        });
      },
    }
  );
};
