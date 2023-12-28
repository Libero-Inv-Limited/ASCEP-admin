type ResponsePost = {
  id: string;
  location: string;
  type: "Post" | "Survey";
  postTitle: string;
  category: "Response" | "Dialogue" | "Democracy (Poll)" | "Risk Management";
  user: string;
  date: string;
  status: "published" | "pending" | "survey";
  action: string;
  sdgs: string[];
};
