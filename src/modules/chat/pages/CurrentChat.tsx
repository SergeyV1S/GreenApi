import {
  EllipsisVerticalIcon,
  MicIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  UserRoundIcon,
  VideoIcon
} from "lucide-react";
import { Suspense, useEffect } from "react";
import type { RouteObject } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

import { usePostGetChatHistoryMutation } from "@shared/api/hooks";
import { PATHS } from "@shared/constants";
import { useGetInstanceData } from "@shared/hooks";
import { cn } from "@shared/lib";
import { EMessageStatus } from "@shared/types";

import { useSendMessage } from "../model";

export const CurrentChatPage = () => {
  const { apiTokenInstance, idInstance } = useGetInstanceData();
  const { onChangeInput, textMessage, sendMessage } = useSendMessage();
  const { chatId } = useParams();
  const params = new URLSearchParams(useLocation().search);

  const name = params.get("name");
  const lastSeen = params.get("lastSeen");

  const postGetChatHistoryMutation = usePostGetChatHistoryMutation();

  useEffect(() => {
    if (!chatId) return;

    const fetchChatHistory = () => {
      postGetChatHistoryMutation.mutate({
        apiTokenInstance,
        idInstance,
        data: {
          chatId,
          count: 10
        }
      });
    };

    fetchChatHistory();

    const intervalId = setInterval(fetchChatHistory, 15000);

    return () => clearInterval(intervalId);
  }, [chatId]);

  return (
    <div className='size-full'>
      <div className='flex flex-col h-full bg-[#efeae2] transition-all duration-300 2xl:rounded-r-2xl'>
        {postGetChatHistoryMutation.isPending ? (
          <div className=''>Загрузка...</div>
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
                    {lastSeen
                      ? `${new Date(lastSeen || 0).getHours()}:
                    ${new Date(lastSeen || 0).getMinutes()}`
                      : "Недавно"}
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
              <div className='py-5 px-14 h-full flex flex-col justify-end gap-5 overflow-y-auto'>
                {postGetChatHistoryMutation.data?.data.reverse().map((message) => (
                  <div
                    key={message.idMessage}
                    className={cn(
                      "w-full flex",
                      message.type === EMessageStatus.INCOMING ? "justify-start" : "justify-end"
                    )}
                  >
                    <p
                      className={cn(
                        "p-4 max-w-[60%] rounded-lg",
                        message.type === EMessageStatus.INCOMING
                          ? "bg-gray-200 text-black"
                          : "bg-green-500 text-white"
                      )}
                    >
                      {message.textMessage}
                    </p>
                  </div>
                ))}
              </div>
            </main>

            <div className='flex items-center gap-5 bg-slate-200 px-5 py-1 2xl:rounded-br-2xl'>
              <PlusIcon />
              <input
                type='text'
                value={textMessage}
                onChange={onChangeInput}
                placeholder='Введите текст сообщения'
                className='border border-slate-200 rounded-xl px-3 py-1 focus:outline-green-200 text-sm h-12 w-full'
              />
              <button onClick={() => sendMessage(chatId!)}>
                <SendIcon />
              </button>
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
