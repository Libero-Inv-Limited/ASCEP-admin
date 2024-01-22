import { useMutation } from "react-query";
import axios from "axios";
import baseUrl from "./baseUrl";
import { z } from "zod";
import { getFioRequestsSchema } from "../schemas/dialogueSchemas";

// export const useGetAllDialogueRequests = () => {
//   return useQuery(
//     ["all-dialogue-requests"],
//     (): Promise<FOIRequestsResponse> =>
//       axios.get(`${baseUrl}/dialogue/all`).then((res) => res.data.data)
//   );
// };

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
