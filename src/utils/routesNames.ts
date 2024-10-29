const ROUTES = {
  SIGNIN_ROUTE: "/auth/login",
  SIGNUP_ROUTE: "/auth/signup",
  MAIN_ROUTE: "/main",

  // REPORT 
  RESPONSE_REPORTS_ROUTE: "/response/reports",
  RESPONSE_REPORTS_INFO_ROUTE: (id: number) => `/response/reports/${id}`,

  // DEBATE
  DEBATES_HOME_ROUTE: "/democracy/debates",
  DEBATE_INFO_ROUTE: (id: number) => `/democracy/debates/${id}`,
  PUBLISH_DEBATE_ROUTE: "/democracy/debates/publish-debate",
  //PROPOSAL
  PROPOSALS_HOME_ROUTE: "/democracy/proposals",
  PROPOSAL_INFO_ROUTE: (proposalId: string) =>
    `/democracy/proposals/${proposalId}`,
  PROPOSAL_COMMUNITY_ROUTE: (proposalId: string) =>
    `/democracy/proposals/community/${proposalId}`,
  PROPOSAL_TOPIC_INFO_ROUTE: (topicId: string) =>
    `/democracy/proposals/community/topic/${topicId}`,
  EDIT_PROPOSAL_ROUTE: (proposalId: string) =>
    `/democracy/proposals/edit-proposal/${proposalId}`,

  START_PROPOSAL_ROUTE: "/democracy/proposals/start-proposal",
  //INITIATIVES
  INITIATIVES_HOME_ROUTE: "/democracy/initiatives",
  SDGs_HOME_ROUTE: "/democracy/sdg",

  //VOTING
  VOTING_HOME_ROUTE: "/democracy/voting",
  START_POLL_ROUTE: "/democracy/voting/start-poll",
  VOTING_INFO_ROUTE: (pollId: string) => `/democracy/voting/${pollId}`,
  EDIT_VOTE_ROUTE: (pollId: string) => `/democracy/voting/edit-vote/${pollId}`,
  CONFIGURE_VOTE_ROUTE: (pollId: string) =>
    `/democracy/voting/configure/${pollId}`,
};

export default ROUTES;
