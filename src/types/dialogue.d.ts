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
