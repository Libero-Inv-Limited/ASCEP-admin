import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import axios from "axios";

import {
  unauthenticatedRoutes,
  mainRoutes,
  dialogueRoutes,
  governanceRoutes,
  usersRoutes,
  updatesRoutes,
  settingsRoutes,
} from "./routes";
import { AuthPagesLayout, MainLayout } from "@/layouts";
import config from "@/utils/config";
import { useToast } from "@/components/ui/use-toast";
import useAutoLogout from "@/hooks/useAuthoLogout";
import { useAuthContext } from "@/providers/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ForbiddenPage from "./Forbidden/ForbiddenPage";

const Router = () => {
  const generateRoutes = (routesArray: RouterType[]) =>
    routesArray.map(({ path, title, element }: RouterType) => (
      <Route key={title} path={path} element={element} />
    ));

  const { toast } = useToast();
  const { logout } = useAuthContext();

  useAutoLogout();

  axios.interceptors.request.use(
    (axiosConfig) => {
      const token = localStorage.getItem(config.key.accessToken);
      axiosConfig.headers.Authorization = `Bearer ${token}`;
      return axiosConfig;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        if (error?.response?.status === 401) {
          logout();
        } else {
          toast({
            title: error?.response?.status === 500 ? "Sorry!" : "Error!",
            description:
              error?.response?.status === 500
                ? "An error occurred on the server"
                : error?.response?.data?.message,
            variant: "error",
          });
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <Routes>
      {/* Auth Pages */}
      <Route path="/auth" element={<AuthPagesLayout />}>
        {generateRoutes(unauthenticatedRoutes)}
      </Route>

      {/* Protected Routes */}
      <Route path="/" element={<MainLayout />}>
        {/* Default Redirect for "/" */}
        <Route index element={<Navigate to="main" replace />} />

        {/* Dashboard Module */}
        <Route element={<ProtectedRoute requiredPermissions={["access dashboard module"]} />}>
          {generateRoutes(mainRoutes)}
        </Route>

        {/* Users Module */}
        <Route element={<ProtectedRoute requiredPermissions={["access users module"]} />}>
          {generateRoutes(usersRoutes)}
        </Route>

        {/* Updates Module */}
        <Route element={<ProtectedRoute requiredPermissions={["access updates module"]} />}>
          {generateRoutes(updatesRoutes)}
        </Route>

        {/* Dialogue Module */}
        <Route element={<ProtectedRoute requiredPermissions={["access dialogue module"]} />}>
          {generateRoutes(dialogueRoutes)}
        </Route>

        {/* Governance Module */}
        <Route element={<ProtectedRoute requiredPermissions={["access governance module"]} />}>
          {generateRoutes(governanceRoutes)}
        </Route>

        {/* Settings Module */}
        <Route element={<ProtectedRoute requiredPermissions={["access settings module"]} />}>
          {generateRoutes(settingsRoutes)}
        </Route>
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<ForbiddenPage />} />
    </Routes>
  );
};

export default Router;
