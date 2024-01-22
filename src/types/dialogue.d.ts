interface DialogueRequest {
  id: string;
  location: string;
  requestTitle: string;
  visibility: "Public" | "Private";
  request: string;
  date: string;
  user: string;
  status: "published" | "pending" | "unavailable";
  authority:
    | "State Government"
    | "Police"
    | "State Assembly"
    | "High court"
    | "FRSC"
    | "NDLEA";
}

interface Authorities {
  id: string;
  title: string;
  date: string;

  description: string;
  engagements: string;
  status: "active" | "inactive";
  sdgs: string[];
}

interface FOIRequest {
  id: number;
  user_id: number;
  authority_id: number;
  public_body_id: any;
  title: string;
  description: string;
  request_date: any;
  status:
    | "pending"
    | "awaiting classification"
    | "fulfilled"
    | "rejected"
    | "awaiting response"
    | "closed";
  public_identifier: "public" | "private";
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
