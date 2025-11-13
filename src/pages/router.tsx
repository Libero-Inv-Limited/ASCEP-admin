import { Navigate, Outlet, Route, Routes } from "react-router-dom";

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
import useAutoLogout from "@/hooks/useAuthoLogout";
import ProtectedRoute from "./ProtectedRoute";
import ForbiddenPage from "./Forbidden/ForbiddenPage";

const Router = () => {
  const generateRoutes = (routesArray: RouterType[]) =>
    routesArray.map(({ path, title, element }: RouterType) => (
      <Route key={title} path={path} element={element} />
    ));

  useAutoLogout();

  /**
   * NOTE: Axios interceptors have been moved to /src/lib/axios.ts
   * Use apiClient from /src/lib/axios.ts for all API calls to get:
   * - Automatic token injection
   * - Global error handling
   * - Request/response logging in development
   *
   * The old interceptors below have been removed to prevent duplicate setup.
   * @see /src/lib/axios.ts for the centralized configuration
   */

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
