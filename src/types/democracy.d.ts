// interface ProposalType {
//   title: string;
//   date: string;
//   content: string;
//   tags: string[];
//   percentage: number;
// }
interface InitiativeType {
  user: string;
  email: string;
  title: string;
  status: string;
  content: string;
  follower: number;
  comments: number;
  tags: string[];
  date: string;
  signed: number;
}
interface SdgOptionsType {
  image: string;
  id: number;
  value: number;
}

interface FilterButtonOptionsType {
  label: string;
  value: string;
}

// DEBATES
interface DebateAuthorType {
  id: number;
  username: string;
  profile_picture: string | null;
}
interface DebateTagType {
  id: number;
  tag_name: string;
  debate_id: number;
}
interface DebateTargetType {
  target_id: number;
  debate_id: number;
  targetInfo: {
    code: string;
    id: number;
  };
}
interface DebateSDGsType {
  sdgs_id: number;
  debate_id: number;
  sdgs: {
    banner: string;
    id: number;
    title: string;
  };
}

interface DebateMetaDataType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  previous_page_url: string | null;
}
interface DebateDataType {
  meta: DebateMetaDataType;
  debates: DebateType[];
}

interface DebateCommentResponseType {
  response_id: number;
  comment_id: number;
  commentDetail: {
    content;
    id: number;
    user_id: number;
    user: DebateAuthorType;
    responses: DebateCommentResponseType[];
  };
}

interface DebateCommentType {
  content: string;
  id: number;
  user_id: number;
  author: DebateAuthorType;
  responses: DebateCommentResponseType[];
  likes: number;
  dislikes: number;
  likePercentage: number;
  dislikePercentage: number;
  userVoted: boolean;
  createdAt: string;
}
interface DebateType {
  id: number;
  title: string;
  description: string;
  shareable_id: string;
  user_id: number;
  total_comments_cache: number;
  total_votes_cache: number;
  inapproriate_flag: boolean;
  createdAt: string;
  debateTag: DebateTagType[];
  author: DebateAuthorType;
  debateTarget: DebateTargetType[];
  debateSDGs: DebateSDGsType[];
  likes: number;
  dislikes: number;
  likePercentage: number;
  dislikePercentage: number;
  userVoted: boolean;
}

//SDGs
interface SDGTarget {
  id: number;
  code: string;
  description: string;
  sdgs_id: number;
}
interface SDGType {
  status: string;
  message: string;
  data: SDGsType[];
}
interface SDGsType {
  id: number;
  title: string;
  description: string;
  official_link: string;
  banner: string;
  sdgTarget: SDGTarget[];
}

type RequestStatustType = "error" | "idle" | "loading" | "success";

interface ResponseDataType {
  status: string;
  message: string;
  data?: any;
}

interface DemocracyTableData {
  id: string;
  location: string;
  title: string;
  category:
    | "Debate"
    | "Voting"
    | "Initiatives"
    | "Proposals"
    | "Budgeting"
    | "SDG";
  user: string;
  date: string;
  status: "published" | "pending" | "unavailable";
  action: string;
}

interface DemocracyAnalyticsType {
  total_debates: string;
  total_proposals: string;
  total_sdgs: string;
  total_initiatives: string;
}

interface CommentDataType {
  meta: CommentMetaDataType;
  comments: CommentType[];
}

interface CommentMetaDataType {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string | null;
  last_page_url: string | null;
  next_page_url: string | null;
  previous_page_url: string | null;
}
interface CommentType {
  content: string;
  id: string;
  user_id: string;
  author: DebateAuthorType;
  responses: DebateCommentResponseType[];
  likes: number;
  dislikes: number;
  likePercentage: number;
  dislikePercentage: number;
  userVoted: {
    reaction: boolean;
    reactionType: "like" | "dislike";
  };
  createdAt: string;
  comment_response_cache: number;
  comment_vote_cache: number;
}

// INITIATIVE
interface InitiativeDataType {
  meta: MetaDataType;
  initiatives: InitiativeType[];
}

interface InitiativeType {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  created_by: string;
  updatedAt: string;
  createdAt: string;
  ward_id: number;
  latitude: number;
  longitude: number;
  location_meta: number;
  support_needed: number;
  meeting_link: string;
  total_followers_cache: number;
  total_support_cache: number;
  total_comments_cache: number;
  initiative_code: string;
  initiativeTag: InitiativeTag[];
  initiativeTarget: InitiativeTarget[];
  initiativeSDGs: InitiativeSDGs[];
  initiativeCategory: InitiativeCategoryType[];
  author: {
    id: string;
    username: string;
    profile_picture: string;
  };
  supportGotten: number;
  supportNeeded: number;
  supportPercentage: number;
  userFollowing: {
    following: boolean;
  };
  userSupported: {
    reaction: boolean;
  };
  meta: MetaDataType;
}

interface InitiativeCategoryType {
  category_id: number;
  initiative_id: string;
  categoryDetail: {
    name: string;
    id: number;
  };
}

interface InitiativeSDGs {
  sdg_id: number;
  initiative_id: string;
  sdg: {
    title: string;
    banner: string;
    id: number;
  };
}

interface InitiativeTarget {
  target_id: number;
  initiative_id: number;
  targetInfo: {
    code: string;
    id: number;
  };
}

interface InitiativeTag {
  id: string;
  tag_name: string;
  initiative_id: string;
}

interface ChangeInitiativeStatusPayload {
  status: string;
  initiative_id: string;
}

// PROPOSALS
interface ProposalDataType {
  meta: MetaDataType;
  proposals: ProposalType[];
}

interface ProposalType {
  id: string;
  user_id: string;
  title: string;
  content: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  summary: string;
  descriptive_image: string;
  support_needed: number;
  ward_id: number;
  external_video_url: string;
  total_support_cache: number;
  total_comments_cache: number;
  proposalTag: ProposalTagType[];
  proposalCategory: ProposalCategoryType[];
  proposalTarget: TargetType[];
  proposalSDGs: ProposalSDGType[];
  author: ProposalAuthorType;
  supportGotten: number;
  supportNeeded: number;
  supportPercentage: number;
  userSupported: boolean;
  proposal_code: string;
  proposalDocuments: {
    document_url: string;
    proposal_id: string;
    id: string;
  }[];
}

interface ProposalAuthorType {
  id: string;
  username: string;
  profile_picture: string;
}
interface ProposalSDGType {
  sdgs_id: number;
  proposal_id: number;
  sdgs: {
    title: string;
    banner: string;
    id: number;
  };
}
interface ProposalCategoryType {
  category_id: number;
  proposal_id: string;
  categoryDetail: {
    name: string;
    id: number;
  };
}
interface ProposalTagType {
  id: number;
  tag_name: string;
  proposal_id: number;
}

// PROPOSAL TOPICS
interface ProposalTopicDataType {
  meta: MetaDataType;
  data: ProposalTopicType[];
}

interface ProposalTopicType {
  id: string;
  proposal_id: string;
  user_id: string;
  title: string;
  content: string;
  total_vote_cache: number;
  total_comment_cache: number;
  updated_at: string;
  created_at: string;
  creator: {
    firstname: string;
    lastname: string;
    username: string;
    profile_picture: string;
    id: string;
  };
  proposal: {
    title: string;
    user_id: string;
    id: string;
  };
}
interface ProposalCommunityMemberType {
  user_id: string;
  creator: {
    profile_picture: string;
    firstname: string;
    lastname: string;
    id: string;
  };
}

//VOTING
interface VotingDataType {
  meta: MetaDataType;
  polls: VotingType[];
}

interface VotingType {
  id: string;
  title;
  start_date: string;
  end_date: string;
  summary: string;
  description: string;
  descriptive_image: string;
  show_result: boolean;
  show_statistics: boolean;
  shareable_id: string;
  total_comments_cache: number;
  created_by: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  votingTarget: VotingTarget[];
  votingSDGs: VotingSDGs[];
  author: {
    id: string;
    username: string;
    profile_picture: string;
  };
  userParticipated: boolean;
  questions: VotingQuestionsType[];
  proposals: ProposalType[];
  votingWards: VotingWardType[];
}

interface VotingWardType {
  voting_id: string;
  wardDetail: WardsType;
  ward_id: number;
}
interface VotingTarget {
  target_id: number;
  voting_id: number;
  targetInfo: {
    code: string;
    id: number;
  };
}

interface VotingSDGs {
  sdg_id: number;
  voting_id: string;
  sdg: {
    title: string;
    banner: string;
    id: number;
  };
}

interface VotingQuestionsType {
  id: string;
  response_type: "single" | "multi_choice";
  question: string;
  options: string[];
  userAnswered: {
    user_responded: boolean;
    response: QuestionResponseType;
  };
  voting_id: string;
  updatedAt: string;
  createdAt: string;
}

type QuestionResponseType = { answer: string[] };

interface VotingProposalType {
  id: string;
  title: string;
  external_video_url: string;
  summary: string;
  descriptive_image: string;
  proposal_code: string;
  proposalDocuments: {
    id: string;
    document_url: string;
    proposal_id: string;
  }[];
}

// BUDGETTING
interface CreateBudgetPayload {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  fiscal_year: string;
  total_amount: string;
  phases: BudgetPhase[];
}

interface BudgetPhase {
  phase_name: string;
  phase_module_code: string;
  start_date: string;
  end_date: string;
  phase_index: number;
}

interface BudgetsResponse {
  meta: MetaDataType;
  budgets: BudgetItem[];
}
interface BudgetPhaseModule {
  phase_module_name: string;
  phase_module_code: string;
}

interface BudgetItem {
  id: number;
  fiscal_year: number;
  start_date: string;
  end_date: string;
  total_amount: string;
  status: string;
  total_phases_cache: number;
  currentPhase: any[];
}

interface UpdateBudgetPayload {
  status: string;
  budget_id: number;
}

interface ProjectProposalResponse {
  meta: MetaDataType;
  proposals: ProjectProposalItem[];
}

interface ProjectProposalItem {
  id: number;
  budget_id: number;
  title: string;
  description: string;
  proposed_by: number;
  status: string;
  updatedAt: string;
  createdAt: string;
  ward_id: number;
  feasibility_status: boolean;
  valuation_status: boolean;
  amount: string;
  assigned_to: any;
  total_votes_for_cache: number;
  total_votes_against_cache: number;
  total_votes_abstain_cache: number;
  total_comments_cache: number;
  image: any;
  project_code: any;
  user: ProjectUSER;
  ward: Ward;
  budgetItem: boolean;
  userVoteStatus: UserVoteStatus;
}

interface ProjectUSER {
  firstname: string;
  lastname: string;
  profile_picture: string;
  id: number;
}

interface Ward {
  ward: string;
  id: number;
}

interface UserVoteStatus {
  reaction: boolean;
  type: any;
}
