import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

interface ProtectedRouteProps {
  requiredPermissions: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({ requiredPermissions, redirectTo = "/404" }: ProtectedRouteProps) => {
  const { user, fetchingUser } = useAppContext();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!fetchingUser) {
      setIsLoaded(true);
    }
  }, [fetchingUser]);

  if (!isLoaded) return null; // Wait until user data is fully loaded

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  const userPermissions = user.permissions || [];
  const hasAccess = requiredPermissions.some((perm) => userPermissions.includes(perm));

  return hasAccess ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
