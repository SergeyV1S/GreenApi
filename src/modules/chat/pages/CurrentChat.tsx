import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import { PATHS } from "@shared/constants";

export const CurrentChatPage = () => <div className=''>f</div>;

export const currentChatPageCreateRoute = (): RouteObject => ({
  path: `${PATHS.ROOT}/:chatId`,
  element: (
    <Suspense fallback={<div>f</div>}>
      <CurrentChatPage />
    </Suspense>
  )
});
