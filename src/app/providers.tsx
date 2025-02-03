import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "@shared/constants";
import { IsMobileProvider } from "@shared/context";

import { routes } from "./router";

export const Providers = () => (
  <IsMobileProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </IsMobileProvider>
);
