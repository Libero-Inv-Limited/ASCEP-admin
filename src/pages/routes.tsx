import {
  ForgotPasswordPage,
  LoginPage,
  OTPPage,
  SignupPage,
  TwoFALogin,
} from "./Auth";
import { MainPage } from "./Main";
import { SettingsPage } from "./Settings";
import { DemocracyPage, ViewAllDemocracyPage } from "./Democracy";
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
import { Navigate } from "react-router-dom";
import ViewReportPage from "./Response/view-report";
import ViewSurveyPage from "./Response/view-survey";

export const landingPages: RouterType[] = [
  {
    path: "",
    element: <LandingPage />,
    title: "home",
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    title: "home",
  },
];

const routes: RouterType[] = [
  {
    path: "",
    element: <Navigate to="/main" />,
    title: "main",
  },
  {
    path: "/main",
    element: <MainPage />,
    title: "main",
  },
  {
    path: "/dialogue",
    element: <DialoguePage />,
    title: "dialoge",
  },
  {
    path: "/dialogue/requests",
    element: <ViewAllRequestsPage />,
    title: "view-requests",
  },
  {
    path: "/dialogue/requests/:requestId",
    element: <ViewRequestPage />,
    title: "view-request",
  },

  {
    path: "/dialogue/authorities/:authorityId",
    element: <ViewAuthorityPage />,
    title: "view-authority",
  },
  {
    path: "/dialogue/authorities",
    element: <AuthoritiesPage />,
    title: "authorities",
  },
  {
    path: "/democracy",
    element: <DemocracyPage />,
    title: "democracy",
  },
  {
    path: "/democracy/view-all",
    element: <ViewAllDemocracyPage />,
    title: "view-all",
  },

  {
    path: "/response",
    element: <ResponsePage />,
    title: "response",
  },
  {
    path: "/response/reports",
    element: <AllReports />,
    title: "all-reports",
  },
  {
    path: "/response/all-surveys",
    element: <AllSurveys />,
    title: "all-surveys",
  },
  {
    path: "/response/reports/:reportId",
    element: <ViewReportPage />,
    title: "report-details-page",
  },
  {
    path: "/response/surveys/:surveyId",
    element: <ViewSurveyPage />,
    title: "survey-details-page",
  },
  {
    path: "/response/create-survey",
    element: <CreateSurveyPage />,
    title: "create-survey",
  },

  {
    path: "/response/categories",
    element: <AllCategoriesPage />,
    title: "all-categories",
  },
  {
    path: "/response/categories/:categoryId",
    element: <ViewCategoryPage />,
    title: "view-category",
  },

  {
    path: "/settings",
    element: <SettingsPage />,
    title: "ssettings",
  },

  // {
  //   path: "/posts/:debateId",
  //   element: <ViewPostPage />,
  //   title: "democracy-debate-info",
  // },
  {
    path: "/users",
    element: <UsersPage />,
    title: "users",
  },
  {
    path: "/users/:userId",
    element: <UserDetailsPage />,
    title: "users-details",
  },
];

export const responseRoutes: RouterType[] = [
  {
    path: "/response/map-view",
    element: <MapView />,
    title: "Map View",
  },
  {
    path: "/response/data-view",
    element: <DataView />,
    title: "Data View",
  },
  {
    path: "/response/activity",
    element: <ActivityPage />,
    title: "Activity",
  },
];

export const unauthenticatedRoutes: RouterType[] = [
  {
    path: "signup",
    element: <SignupPage />,
    title: "signup",
  },
  {
    path: "2fa-login",
    element: <TwoFALogin />,
    title: "2fa-login",
  },
  {
    path: "login",
    element: <LoginPage />,
    title: "login",
  },
  {
    path: "otp",
    element: <OTPPage />,
    title: "otp",
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
    title: "forgot-password",
  },
];

export default routes;
