import { Navigate, Outlet, useLocation } from "react-router-dom";

import { LOCAL_STORAGE, PATHS } from "@shared/constants";

export const PrivateRoute = () => {
  const location = useLocation();

  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE);
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE);

  const isAuthenticated = Boolean(apiTokenInstance && idInstance);
  const isAuthPage = location.pathname === PATHS.AUTH;

  if (!isAuthenticated) {
    return isAuthPage ? (
      <Outlet />
    ) : (
      <Navigate to={PATHS.AUTH} state={{ from: location }} replace />
    );
  }

  if (isAuthenticated && isAuthPage) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
