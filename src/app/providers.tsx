import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "@shared/constants";
import { IsMobileProvider, ModalContextProvider } from "@shared/context";

import { routes } from "./router";

export const Providers = () => (
  <IsMobileProvider>
    <ModalContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </ModalContextProvider>
  </IsMobileProvider>
);
