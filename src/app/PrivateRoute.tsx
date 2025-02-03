import { Navigate, Outlet, useLocation } from "react-router-dom";

import { LOCAL_STORAGE, PATHS } from "@shared/constants";

export const PrivateRoute = () => {
  const location = useLocation();

  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE);
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE);

  if (!apiTokenInstance || !idInstance) {
    return <Navigate to={PATHS.AUTH} state={{ from: location }} replace />;
  }

  if (apiTokenInstance && idInstance && location.pathname === PATHS.AUTH) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
