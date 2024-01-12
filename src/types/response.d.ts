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
  reportSDGs: ReportSdg[];
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

interface GetReportCommentsResonponsesQueryArgs {
  id: number;
  perPage: number;
}

interface PostCommentPayload {
  content: string;
  report_id: string;
  comment_reference?: number;
}
