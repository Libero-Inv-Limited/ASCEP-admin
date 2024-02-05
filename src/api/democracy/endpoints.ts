import baseUrl from "../baseUrl";

//DEBATES ENDPOINTS
const perPage = 10;
export const PUBLISH_DEBATES_ENDPOINT = baseUrl + "/debate/publish";
export const PUBLISH_COMMENT_ENDPOINT = baseUrl + "/debate/comment";
export const GET_ALL_DEBATES_ENDPOINT = baseUrl + "/debate/all";
export const GET_DEBATE_INFO_ENDPOINT = (debateId: string) =>
  baseUrl + `/debate/info/${debateId}`;
export const GET_ALL_SDGs_ENDPOINT = baseUrl + "/sdg/all";

export const GET_DEBATE_COMMENTS_ENDPOINT = (
  debateId: string,
  page: number,
  filter?: string
) =>
  baseUrl +
  `/debate/comments?page=${page}&perPage=${perPage}&filter=${filter}&debate=${debateId}`;
export const GET_DEBATE_COMMENTS_RESPONSES_ENDPOINT = (
  commentId: string,
  page: number
) =>
  baseUrl +
  `/debate/comment-responses?page=${page}&perPage=${perPage}&comment=${commentId}`;

export const VOTE_DEBATE_COMMENT_ENDPOINT = (
  type: string,
  comment_id: string
) => baseUrl + `/debate/vote-comment/${type}/${comment_id}`;
