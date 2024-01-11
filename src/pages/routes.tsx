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
  CreateSurveyPage,
  DataView,
  MapView,
  ResponsePage,
  ViewAllPage,
  ViewResponsePage,
} from "./Response";
import { ContactUs, LandingPage } from "./Landing";
import { UserDetailsPage, UsersPage } from "./Users";
import { AuthoritiesPage, DialoguePage, ViewAllRequestsPage } from "./Dialogue";
import { Navigate } from "react-router-dom";

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
    path: "/dialogue/view-all",
    element: <ViewAllRequestsPage />,
    title: "view-all",
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
    path: "/response/view-all",
    element: <ViewAllPage />,
    title: "view-all",
  },
  {
    path: "/response/posts/:postId",
    element: <ViewResponsePage />,
    title: "reponse-details",
  },
  {
    path: "/response/create-survey",
    element: <CreateSurveyPage />,
    title: "create-survey",
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
  // {
  //   path: `/response/1`,
  //   element: <ViewResponsePage />,
  //   title: "View Response",
  // },
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
