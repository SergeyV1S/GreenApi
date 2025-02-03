import { authPageCreateRoute } from "@modules/auth/pages";
import { chatPageCreateRoute } from "@modules/chat/pages";
import { createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { ChatLayout } from "./layouts";

export const routes = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      authPageCreateRoute(),
      {
        element: <ChatLayout />,
        children: [chatPageCreateRoute()]
      }
    ]
  }
]);
