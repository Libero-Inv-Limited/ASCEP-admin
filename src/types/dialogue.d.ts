type DialogueStatus =
  | "pending"
  | "awaiting classification"
  | "fulfilled"
  | "rejected"
  | "awaiting response"
  | "closed";

type DiablogueVisibility = "public" | "private";

interface Authorities {
  id: string;
  title: string;
  date: string;
  description: string;
  engagements: string;
  status: "active" | "inactive";
  sdgs: string[];
}

//  ======== REQUESTS ========

interface FOIRequest {
  id: number;
  user_id: number;
  authority_id: number;
  public_body_id: any;
  title: string;
  description: string;
  request_date: any;
  status: DialogueStatus;

  public_identifier: DialogueVisibility;
  updatedAt: string;
  createdAt: string;
  shareable_id: string;
  author: FOIAuthor;
  authority: FOIAuthority;
}

interface FOIAuthor {
  id: number;
  username: string;
  profile_picture: any;
}

interface FOIAuthority {
  name: string;
  id: number;
}

interface FOIRequestsResponse {
  foi_requests: FOIRequest[];
  meta: MetaDataType;
}

interface GetFIORequestsPayload {
  page: number;
  perPage?: number;
  filter: FIORequestFilter;
}

interface FIORequestFilter {
  text: string;
  status: string;
  authority: number;
  privacy: string;
  datetimeRange: DateTimeRange;
}

interface DateTimeRange {
  startDate: string;
  endDate: string;
}

// =========== REQUEST RESPONSES ===========
interface DialogueRequestResponsesResponse {
  responses: DialogueRequestResponse[];
  meta: MetaDataType;
}

interface DialogueRequestResponse {
  id: number;
  responder_id: number;
  authority_id: number;
  request_id: number;
  response_text: string;
  response_date: string;
  is_public: boolean;
  updatedAt: string;
  createdAt: string;
  is_user_response: boolean;
  is_moderator_response: boolean;
  attachments: any[];
  authority: FOIAuthority;
  user: ResponseUser;
}

interface ResponseUser {
  firstname: string;
  lastname: string;
  profile_picture: string;
  username: string;
  id: number;
}
