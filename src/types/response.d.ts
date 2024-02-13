type ResponsePost = {
  id: string;
  location: string;
  type: "Post" | "Survey";
  postTitle: string;
  category: "Response" | "Dialogue" | "Democracy (Poll)" | "Risk Management";
  user: string;
  date: string;
  status: "published" | "pending" | "completed";
  action: string;
  sdgs: string[];
};

interface ReportResponse {
  status: string;
  message: string;
  reports: ReportData;
}
interface ReportData {
  id: number;
  user_id: number;
  title: string;
  description: string;
  submission_date: any;
  status_id: any;
  report_type: string;
  updatedAt: string;
  createdAt: string;
  longitude: number;
  latitude: number;
  location_meta: string;
  total_comments_cache: number;
  reportSDGs: SDGObj[];
  reportCategory: ReportCategory;
  reporter: Reporter;
  reportImages: ReportImage[];
  reportStatus: ReportStatus;
}

interface ReportSdg {
  sdg_id: number;
  report_id: number;
  sdg: Sdg;
}

interface Sdg {
  title: string;
  banner: string;
  id: number;
}

interface ReportCategory {
  category_id: number;
  report_id: number;
  categoryDetail: CategoryDetail;
}

interface CategoryDetail {
  name: string;
  id: number;
}

interface Reporter {
  username: string;
  firstname: any;
  lastname: any;
  profile_picture: any;
  id: number;
}

interface ReportImage {
  image_url: string;
  report_id: number;
}

interface ReportStatus {
  name: string;
  slug: string;
  description: string;
  id: number;
}

interface ResponseAnalyticsObj {
  total_reports: string;
  total_surveys: string;
  total_active_reports: string;
  engagements: string;
}

interface GetAllReportsQueryArgs {
  filtersString: string;
}

interface GetReportCommentsQueryArgs {
  id: string;
  page: number;
}

interface GetReportCommentsResonponsesQueryArgs {
  id: number;
  perPage: number;
}

interface PostCommentPayload {
  content: string;
  report_id: string;
  comment_reference?: number;
}

interface SurveyData {
  id: number;
  title: string;
  description: string;
  category_id: number;
  start_date: string;
  end_date: string;
  status: string;
  created_by: number;
  updatedAt: string;
  createdAt: string;
  longitude: string;
  latitude: string;
  location_meta: string;
  surveySDGs: SDGObj[];
}

interface SDGObj {
  sdg_id: number;
  survey_id: number;
  sdg: Sdg;
}

interface SurveryInfoData {
  id: number;
  title: string;
  description: string;
  category_id: number;
  start_date: string;
  end_date: string;
  status: string;
  created_by: number;
  updatedAt: string;
  createdAt: string;
  longitude: string;
  latitude: string;
  location_meta: string;
  surveySDGs: SDGObj[];
  questions: Question[];
}

interface Question {
  id: number;
  survey_id: number;
  question_text: string;
  response_type: string;
  updatedAt: string;
  createdAt: string;
  question_options?: string[];
  userAnswered: boolean;
  userResponse: string | string[];
}

// RESPONSE COMMENTS

interface ReportCommentsResponse {
  meta: MetaDataType;
  comments: ReportComment[];
}

interface ReportComment {
  content: string;
  id: number;
  user_id: number;
  comment_vote_cache: number;
  comment_response_cache: number;
  createdAt: string;
  author: Author;
}
interface ReportComment {
  content: string;
  id: number;
  user_id: number;
  comment_vote_cache: number;
  comment_response_cache: number;
  createdAt: string;
  author: Author;
  images: CommentImage[];
}

interface CommentImage {
  id: number;
  file_url: string;
  file_type: string;
  report_comment_id: number;
}

interface Author {
  username: string;
  profile_picture: string;
  id: number;
}

interface CreateSurveyPayload {
  sdgs?: number[];
  category: number;
  location_meta: string | undefined;
  latitude: number | undefined;
  longitude: number | undefined;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
}

type SurveyQuestionType = "text" | "single_choice" | "multiple_choice";

interface SurveyResponseResponse {
  responses: SurveyResponse[];
  meta: MetaDataType;
}

interface SurveyResponseItem {
  id: number;
  question_id: number;
  user_id: number;
  response_text: string[];
  updatedAt: string;
  createdAt: string;
  user: SurveyUser;
}

interface SurveyUser {
  firstname: string;
  lastname: string;
  username: string;
  profile_picture: string;
  id: number;
}

interface CategoryModeratorType {
  id: number;
  user_id: number;
  category_id: number;
  user: ModeratorUser;
}

interface ModeratorUser {
  username: ReactNode;
  firstname: string;
  lastname: string;
  profile_picture: any;
  id: number;
}
