import { Chats } from "@modules/chat";
import { MessageSquareTextIcon, TargetIcon, UsersIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

import {
  useGetLastIncomingMessagesQuery,
  useGetLastOutgoingMessagesQuery
} from "@shared/api/hooks";
import { LOCAL_STORAGE } from "@shared/constants";

export const ChatLayout = () => {
  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE) as string;
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE) as string;

  const lastIncomingMessagesQuery = useGetLastIncomingMessagesQuery({
    config: { params: { idInstance, apiTokenInstance } }
  });
  const lastOutgoingMessagesQuery = useGetLastOutgoingMessagesQuery({
    config: { params: { idInstance, apiTokenInstance } }
  });

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-300'>
      <div className='max-2xl:hidden fixed top-0 w-full bg-green-600 h-32' />
      <section className='2xl:w-[calc(100%-50px)] 2xl:h-[calc(100vh-50px)] max-2xl:w-full max-2xl:h-screen bg-slate-100 z-50 grid grid-cols-[70px_350px_1fr] 2xl:rounded-2xl'>
        <aside className='h-full border-r border-r-slate-300'>
          <nav className=' flex items-center flex-col gap-10 py-5'>
            <Link to='#'>
              <MessageSquareTextIcon className='size-6' />
            </Link>
            <Link to='#'>
              <TargetIcon className='size-6' />
            </Link>
            <Link to='#'>
              <UsersIcon className='size-6' />
            </Link>
          </nav>
        </aside>
        {lastIncomingMessagesQuery.isLoading && lastOutgoingMessagesQuery.isLoading ? (
          <div className=''>Загрузка...</div>
        ) : (
          lastIncomingMessagesQuery.data &&
          lastOutgoingMessagesQuery.data && (
            <Chats
              chats={[
                ...new Map(
                  [
                    ...new Map(
                      lastIncomingMessagesQuery.data.data.map((item) => [item.chatId, item])
                    ).values(),
                    ...new Map(
                      lastOutgoingMessagesQuery.data.data.map((item) => [item.chatId, item])
                    ).values()
                  ].map((item) => [item.chatId, item])
                ).values()
              ]}
            />
          )
        )}
        <div className='w-full'>
          <Outlet />
        </div>
      </section>
    </main>
  );
};
