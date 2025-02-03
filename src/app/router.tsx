import { authPageCreateRoute } from "@modules/auth/pages";
import { chatPageCreateRoute } from "@modules/chat/pages";
import { createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";

export const routes = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [authPageCreateRoute(), chatPageCreateRoute()]
  }
]);
