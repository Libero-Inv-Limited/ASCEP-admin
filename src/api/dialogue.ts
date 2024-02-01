import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { z } from "zod";
import { getFioRequestsSchema } from "../schemas/dialogueSchemas";
import { useToast } from "@/components/ui/use-toast";

// GET ALL REQUESTS
export const useGetAllDialogueRequests = () => {
  return useMutation(
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

export const useAddDialogueModerator = () => {
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
        queryClient.invalidateQueries("dialogue-authority-moderators");
        queryClient.invalidateQueries("dialogue-request-info");
        queryClient.invalidateQueries("authority-info");
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

export const useUpdateRequstStatus = () => {
  const { toast } = useToast();

  return useMutation(
    (values: UpdateDialogueRequestStatusPayload) => {
      return axios
        .put(`${baseUrl}/dialogue/update-request-status`, values)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        toast({
          title: "Success!",
          variant: "success",
          description: `Status updated`,
          duration: 2000,
        });
      },
    }
  );
};

export const useDeleteDialogueAuthorityModerator = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation(
    ({ user, authority }: { user: number; authority: string }) => {
      return axios
        .delete(`${baseUrl}/authority/moderator/${user}/${authority}`)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dialogue-authority-moderators");
        queryClient.invalidateQueries("dialogue-request-info");
        queryClient.invalidateQueries("authority-info");
        toast({
          title: "Success!",
          variant: "success",
          description: `Moderator Deleted`,
          duration: 2000,
        });
      },
    }
  );
};
