import { Spin } from "antd";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { PATHS } from "@shared/constants";

import { PrivateRoute } from "./PrivateRoute";

const RootScreen = lazy(() => import("./RootPage"));

export const routes = createBrowserRouter([
  // {
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: PATHS.SIGNIN,
  //       element: (
  //         <Suspense fallback={<Spinner />}>
  //           <SignInScreen />
  //         </Suspense>
  //       )
  //     },
  //     {
  //       path: PATHS.SIGNUP,
  //       element: (
  //         <Suspense fallback={<Spinner />}>
  //           <SignUpScreen />
  //         </Suspense>
  //       )
  //     }
  //   ]
  // },
  {
    path: "/",
    element: (
      <Suspense fallback={<Spin />}>
        <RootScreen />
      </Suspense>
    )
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: PATHS.PROFILE,
        element: (
          <Suspense fallback={<Spin />}>
            <div className=''>Профиль</div>
          </Suspense>
        )
      }
    ]
  }
]);
