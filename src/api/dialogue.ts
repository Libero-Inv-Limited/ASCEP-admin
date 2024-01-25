import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { z } from "zod";
import {
  CreateAuthoritySchema,
  getFioRequestsSchema,
} from "../schemas/dialogueSchemas";
import { useToast } from "@/components/ui/use-toast";

// GET ALL REQUESTS
export const useGetAllDialogueRequests = () => {
  return useMutation(
    ["get-requests"],
    (
      values: z.infer<typeof getFioRequestsSchema>
    ): Promise<FOIRequestsResponse> => {
      return axios
        .post(`${baseUrl}/dialogue/all`, { ...values })
        .then((res) => res.data.data);
    }
  );
};

export const useGetDialogueRequestInfo = (id: string) => {
  return useQuery(
    ["dialogue-request-info"],

    (): Promise<FOIRequest> => {
      return axios
        .get(`${baseUrl}/dialogue/info/${id}`)
        .then((res) => res.data.data.foirequest);
    },
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetDialogueRequestResponses = (queries: PaginationWithId) => {
  return useQuery(
    ["dialogue-request-responses", queries],

    (): Promise<DialogueRequestResponsesResponse> => {
      return axios
        .get(
          `${baseUrl}/dialogue/request-responses?request_id=${
            queries.id
          }&page=${queries.page}&perPage=${10}`
        )
        .then((res) => res.data.data);
    },
    {
      retry: false,
      // refetchOnWindowFocus: false,
    }
  );
};

export const useCeateAuthority = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    (values: CreateAuthoritySchema) => {
      return axios
        .post(`${baseUrl}/authority/create`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("authorities");
        toast({
          title: "Success!",
          variant: "success",
          description: `Authority Added`,
          duration: 2000,
        });
      },
    }
  );
};

export const useAddModerator = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation(
    (values: { user: number; authority: string }) => {
      return axios
        .put(`${baseUrl}/authority/moderator`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("moderators");
        toast({
          title: "Success!",
          variant: "success",
          description: `Moderator Added`,
          duration: 2000,
        });
      },
    }
  );
};
