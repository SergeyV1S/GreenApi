import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const ChatPage = () => (
  <main className='flex min-h-screen items-center justify-center bg-slate-200'>
    <div className='max-2xl:hidden fixed top-0 w-full bg-green-600 h-32' />
    <section className='w-full z-50 flex items-center justify-center'>Привет</section>
  </main>
);

export const chatPageCreateRoute = (): RouteObject => ({
  path: "/",
  element: (
    <Suspense fallback={<div>f</div>}>
      <ChatPage />
    </Suspense>
  )
});
