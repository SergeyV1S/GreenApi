import {
  EllipsisVerticalIcon,
  MicIcon,
  PlusIcon,
  SearchIcon,
  UserRoundIcon,
  VideoIcon
} from "lucide-react";
import { Suspense, useEffect } from "react";
import type { RouteObject } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

import { usePostGetChatHistoryMutation } from "@shared/api/hooks";
import { LOCAL_STORAGE, PATHS } from "@shared/constants";
import { cn } from "@shared/lib";
import { EMessageStatus } from "@shared/types";

export const CurrentChatPage = () => {
  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE) as string;
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE) as string;
  const { chatId } = useParams();
  const params = new URLSearchParams(useLocation().search);

  const name = params.get("name");
  const lastSeen = params.get("lastSeen");

  const postGetChatHistoryMutation = usePostGetChatHistoryMutation();

  useEffect(() => {
    postGetChatHistoryMutation.mutate({
      apiTokenInstance,
      idInstance,
      data: {
        chatId: chatId!,
        count: 30
      }
    });
  }, [chatId]);

  return (
    <div className='size-full'>
      <div className='flex flex-col h-full bg-[#efeae2] transition-all duration-300 2xl:rounded-r-2xl'>
        {postGetChatHistoryMutation.isPending ? (
          <div className=''>Загрузка</div>
        ) : (
          <>
            <header className='w-full p-3 flex items-center justify-between bg-white 2xl:rounded-tr-2xl'>
              <div className='flex items-center gap-2'>
                <div className='rounded-full bg-slate-200'>
                  <UserRoundIcon size={40} className='text-white p-1' />
                </div>
                <div className='space-y-1.5'>
                  <p>{name}</p>
                  <p className='text-xs'>
                    был(-а) сегодня в{" "}
                    {`${new Date(lastSeen || 0).getHours()}:
                    ${new Date(lastSeen || 0).getMinutes()}`}
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-5'>
                <VideoIcon />
                <SearchIcon />
                <EllipsisVerticalIcon />
              </div>
            </header>
            <main className="flex-1 h-full bg-[url('/img/chat-bg.png')]">
              <div className='py-5 px-14 h-full flex justify-end flex-col gap-5'>
                {postGetChatHistoryMutation.data?.data.reverse().map((message) => (
                  <div
                    key={message.idMessage}
                    className={cn(
                      "w-full flex",
                      message.type === EMessageStatus.INCOMING ? "items-start" : "items-right"
                    )}
                  >
                    <p className='bg-white p-4'>{message.textMessage}</p>
                  </div>
                ))}
              </div>
            </main>
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
