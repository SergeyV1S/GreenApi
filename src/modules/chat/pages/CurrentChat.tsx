import {
  EllipsisVerticalIcon,
  MicIcon,
  PlusIcon,
  SearchIcon,
  UserRoundIcon,
  VideoIcon
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { type RouteObject, useParams } from "react-router-dom";

import { getChatHistory } from "@shared/api";
import { LOCAL_STORAGE, PATHS } from "@shared/constants";
import type { ITextMessage } from "@shared/types";

export const CurrentChatPage = () => {
  const [chatData, setChatData] = useState<ITextMessage[] | null>(null);
  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE) as string;
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE) as string;
  const { chatId } = useParams();

  useEffect(() => {
    getChatHistory({
      params: {
        apiTokenInstance,
        idInstance,
        data: {
          chatId: chatId!,
          count: 30
        }
      }
    }).then((res) => setChatData(res.data));
  }, [chatId]);

  return (
    <div className='size-full'>
      <div className='flex flex-col h-full bg-[#efeae2] transition-all duration-300 2xl:rounded-r-2xl'>
        {chatData && (
          <>
            <header className='w-full p-3 flex items-center justify-between bg-white 2xl:rounded-tr-2xl'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-slate-200'>
                  <UserRoundIcon size={40} className='text-white p-1' />
                </div>
                <div className='space-y-1.5'>
                  <p>Руслан</p>
                  <p className='text-xs'>был(-а) сегодня в 22:41</p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <VideoIcon />
                <SearchIcon />
                <EllipsisVerticalIcon />
              </div>
            </header>
            <main className="flex-1 bg-[url('/img/chat-bg.png')]">f</main>
            <div className='flex items-center gap-5 bg-slate-200 px-5 py-1 2xl:rounded-br-2xl'>
              <PlusIcon />
              <input
                type='text'
                placeholder='Введите текст сообщения'
                className='border border-slate-200 rounded-xl px-3 py-1 focus:outline-green-200 text-sm h-12 w-full'
              />
              <MicIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const currentChatPageCreateRoute = (): RouteObject => ({
  path: `${PATHS.ROOT}/:chatId`,
  element: (
    <Suspense fallback={<div>f</div>}>
      <CurrentChatPage />
    </Suspense>
  )
});
