import { EllipsisVerticalIcon, MessageSquarePlusIcon, UserRoundIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useModal } from "@shared/context";
import { useGetInstanceData } from "@shared/hooks";
import { cn } from "@shared/lib";
import { formateChatId } from "@shared/lib";
import type { ITextMessage } from "@shared/types";
import { Input, Modal } from "@shared/ui";

import { useChats } from "../model";
import { AddChatForm } from "./AddChatForm";

interface IChatsProps {
  lastIncomingMessages: ITextMessage[];
  lastOutgoingMessages: ITextMessage[];
}

export const Chats = ({ lastIncomingMessages, lastOutgoingMessages }: IChatsProps) => {
  const { apiTokenInstance, idInstance } = useGetInstanceData();

  const { chats, lastMessageInChats, mutateAsync, setChatsList, chatsList, isSuccess } = useChats(
    lastIncomingMessages,
    lastOutgoingMessages
  );

  const { isModalOpen, openModal } = useModal();

  useEffect(() => {
    if (chats.length === 0) return;

    const fetchContacts = async () => {
      setChatsList([]);
      chats.map((chat) =>
        mutateAsync({
          apiTokenInstance,
          data: { chatId: chat },
          idInstance
        })
      );
    };

    fetchContacts();

    const intervalId = setInterval(fetchContacts, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='h-full bg-white p-5 space-y-6'>
      <div className='w-full flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Чаты</h2>
        <div className='flex items-center gap-6'>
          <button className='bg-none border-none' onClick={() => openModal()}>
            <MessageSquarePlusIcon />
          </button>
          <EllipsisVerticalIcon />
        </div>
      </div>
      <Input type='text' placeholder='Поиск' />
      {!isSuccess ? (
        <div className=''>Загрузка...</div>
      ) : (
        <div className='divide-y'>
          {chatsList.map((chat) => (
            <NavLink
              key={chat.chatId}
              to={`${chat.chatId}?name=${chat.name}&lastSeen=${chat.lastSeen}`}
              className={({ isActive }) =>
                cn(
                  "block w-full relative rounded-lg py-5 px-2 hover:bg-green-50",
                  isActive && "bg-green-100"
                )
              }
            >
              <div className='flex items-center gap-3'>
                <div className='rounded-full bg-slate-200'>
                  {chat.avatar ? (
                    <img src={chat.avatar} alt={chat.name} className='size-12' />
                  ) : (
                    <UserRoundIcon size={48} className='text-white p-1' />
                  )}
                </div>
                <div className='space-y-1.5'>
                  <p>{chat.contactName || chat.name || formateChatId(chat.chatId)}</p>
                  <p className='truncate text-xs w-full'>
                    {lastMessageInChats[chat.chatId].textMessage || "Сообщение"}
                  </p>
                </div>
              </div>
              <p className='absolute top-4 right-4 text-xs opacity-70'>{`${new Date(lastMessageInChats[chat.chatId].timestamp).getHours()}:${new Date(lastMessageInChats[chat.chatId].timestamp).getMinutes()}`}</p>
            </NavLink>
          ))}
        </div>
      )}
      {isModalOpen && (
        <Modal>
          <AddChatForm />
        </Modal>
      )}
    </div>
  );
};
