import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import { PATHS } from "@shared/constants";

const ChatPage = () => (
  <div className='flex items-center justify-center h-full w-full'>
    <h1 className='text-2xl font-semibold'>Выберите чат</h1>
  </div>
);

export const chatPageCreateRoute = (): RouteObject => ({
  path: PATHS.ROOT,
  element: (
    <Suspense fallback={<div>f</div>}>
      <ChatPage />
    </Suspense>
  )
});
