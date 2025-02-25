import { Navigate } from "react-router-dom";
import {
  ForgotPasswordPage,
  LoginPage,
  OTPPage,
  SignupPage,
  TwoFALogin,
} from "./Auth";
import { MainPage } from "./Main";
import { SettingsPage } from "./Settings";
import {
  BudgetingPage,
  // BudgetingPhasesPage,
  DemocracyPage,
  SDGsHomePage,
  ViewAllDebatesPage,
  ViewAllInitiativesPage,
  ViewAllProposalsPage,
  ViewBudgetPage,
  ViewDebatePage,
  ViewInitiativePage,
  // ViewAllProposalsPage,
} from "./Democracy";
import {
  ActivityPage,
  AllCategoriesPage,
  AllReports,
  AllSurveys,
  CreateSurveyPage,
  DataView,
  MapView,
  ResponsePage,
  ViewCategoryPage,
} from "./Response";
import { ContactUs, LandingPage } from "./Landing";
import { UserDetailsPage, UsersPage } from "./Users";
import {
  AuthoritiesPage,
  DialoguePage,
  ViewAllRequestsPage,
  ViewAuthorityPage,
  ViewRequestPage,
} from "./Dialogue";
import ViewReportPage from "./Response/view-report";
import ViewSurveyPage from "./Response/view-survey";
import ProposalCommuntityHomePage from "./Democracy/proposals/proposal-community";
import SelectProjectPage from "./Democracy/budgeting/select-project";
import UpdateReportPage from "./Response/update-report";
import ViewProposalPage from "./Democracy/proposals/view-proposal";

export const landingPages = [
  { path: "", element: <LandingPage />, title: "home" },
  { path: "contact-us", element: <ContactUs />, title: "contact-us" },
];

export const mainRoutes = [
  { path: "/", element: <Navigate to="/main" replace />, title: "main" },
  { path: "main", element: <MainPage />, title: "main" },
];

export const dialogueRoutes = [
  { path: "dialogue", element: <DialoguePage />, title: "dialogue" },
  { path: "dialogue/requests", element: <ViewAllRequestsPage />, title: "view-requests" },
  { path: "dialogue/requests/:requestId", element: <ViewRequestPage />, title: "view-request" },
  { path: "dialogue/authorities", element: <AuthoritiesPage />, title: "authorities" },
  { path: "dialogue/authorities/:authorityId", element: <ViewAuthorityPage />, title: "view-authority" },
];

export const governanceRoutes = [
  { path: "democracy", element: <DemocracyPage />, title: "governance" },
  { path: "democracy/debates", element: <ViewAllDebatesPage />, title: "view-debates" },
  { path: "democracy/debates/:debateId", element: <ViewDebatePage />, title: "view-debate" },
  {path: "democracy/initiatives", element: <ViewAllInitiativesPage />, title: "view-initiatives"},
  {path: "democracy/initiatives/:initiativeId", element: <ViewInitiativePage />, title: "view-initiative"},
  { path: "democracy/proposals", element: <ViewAllProposalsPage />, title: "view-proposals" },
  { path: "democracy/proposals/:proposalId", element: <ViewProposalPage />, title: "view-proposal" },
  { path: "democracy/proposals/community/:proposalId", element: <ProposalCommuntityHomePage />, title: "proposal-community" },
  { path: "democracy/sdgs", element: <SDGsHomePage />, title: "view-SDGs" },
  { path: "democracy/budgeting", element: <BudgetingPage />, title: "view-budgeting" },
  { path: "democracy/budgeting/select-project/:budgetId", element: <SelectProjectPage />, title: "select-project" },
  { path: "democracy/budgeting/:budgetId", element: <ViewBudgetPage />, title: "view-budget" },
];

export const usersRoutes = [
  { path: "users", element: <UsersPage />, title: "users" },
  { path: "users/:userId", element: <UserDetailsPage />, title: "user-details" },
];

export const updatesRoutes = [
  { path: "response", element: <ResponsePage />, title: "updates" },
  { path: "response/reports", element: <AllReports />, title: "all-reports" },
  { path: "response/reports/:reportId", element: <ViewReportPage />, title: "report-details" },
  { path: "response/reports/update-report", element: <UpdateReportPage />, title: "update-report" },
  { path: "response/surveys/:surveyId", element: <ViewSurveyPage />, title: "survey-details" },
  { path: "response/all-surveys", element: <AllSurveys />, title: "all-surveys" },
  { path: "response/create-survey", element: <CreateSurveyPage />, title: "create-survey" },
  { path: "response/categories", element: <AllCategoriesPage />, title: "all-categories" },
  { path: "response/categories/:categoryId", element: <ViewCategoryPage />, title: "view-category" },
];

export const responseRoutes = [
  { path: "response/map-view", element: <MapView />, title: "map-view" },
  { path: "response/data-view", element: <DataView />, title: "data-view" },
  { path: "response/activity", element: <ActivityPage />, title: "activity" },
]

export const settingsRoutes = [
  { path: "settings", element: <SettingsPage />, title: "settings" },
];

export const unauthenticatedRoutes = [
  { path: "signup", element: <SignupPage />, title: "signup" },
  { path: "2fa-login", element: <TwoFALogin />, title: "2fa-login" },
  { path: "login", element: <LoginPage />, title: "login" },
  { path: "otp", element: <OTPPage />, title: "otp" },
  { path: "forgot-password", element: <ForgotPasswordPage />, title: "forgot-password" },
];

export default [...mainRoutes, ...dialogueRoutes, ...governanceRoutes, ...usersRoutes, ...updatesRoutes, ...responseRoutes, ...settingsRoutes];
