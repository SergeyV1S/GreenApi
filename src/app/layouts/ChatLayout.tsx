import { Chats } from "@modules/chat";
import { MessageSquareTextIcon, TargetIcon, UsersIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

import {
  useGetLastIncomingMessagesQuery,
  useGetLastOutgoingMessagesQuery
} from "@shared/api/hooks";
import { useGetInstanceData } from "@shared/hooks";

export const ChatLayout = () => {
  const { apiTokenInstance, idInstance } = useGetInstanceData();

  const lastIncomingMessagesQuery = useGetLastIncomingMessagesQuery({
    config: { params: { idInstance, apiTokenInstance } },
    options: { refetchInterval: 15000 }
  });
  const lastOutgoingMessagesQuery = useGetLastOutgoingMessagesQuery({
    config: { params: { idInstance, apiTokenInstance } },
    options: { refetchInterval: 15000 }
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
              lastIncomingMessages={lastIncomingMessagesQuery.data.data}
              lastOutgoingMessages={lastOutgoingMessagesQuery.data.data}
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
