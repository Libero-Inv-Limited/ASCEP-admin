interface MainAnalyticsType {
  reports: string;
  surveys: string;
  debates: string;
  initiatives: string;
  proposals: string;
  sdgs: string;
  polls: string;
}

interface PollType {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  summary: string;
  description: string;
  descriptive_image: any;
  show_result: boolean;
  show_statistics: boolean;
  shareable_id: string;
  total_comments_cache: number;
  created_by: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  votingTarget: VotingTarget[];
  votingSDGs: VotingSdg[];
  author: Author;
  userParticipated: boolean;
  questions: PollQuestion[];
}

interface ReportTrend {
  month: string;
  rejected_reports: number;
  approved_reports: number;
  total_comments: number;
  total_reports: number;
}

interface ChartCategory {
  title: string;
  total: number;
  color: string;
}

interface SurveyTrend {
  month: string;
  draft_surveys: number;
  completed_surveys: number;
  ongoing_surveys: number;
  total_responses: number;
  total_surveys: number;
}

interface ProposalTrend {
  month: string;
  pending_proposals: number;
  approved_proposals: number;
  total_comments: number;
  total_proposals: number;
}
