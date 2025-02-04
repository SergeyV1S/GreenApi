import { EllipsisVerticalIcon, MessageSquarePlusIcon, UserRoundIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useModal } from "@shared/context";
import { useGetInstanceData } from "@shared/hooks";
import { cn } from "@shared/lib";
import { formateChatId } from "@shared/lib";
import type { ITextMessage } from "@shared/types";
import { Modal } from "@shared/ui";

import { useChats } from "../model";
import { AddChatForm } from "./AddChatForm";

interface IChatsProps {
  lastIncomingMessages: ITextMessage[];
  lastOutgoingMessages: ITextMessage[];
}

export const Chats = ({ lastIncomingMessages, lastOutgoingMessages }: IChatsProps) => {
  const { apiTokenInstance, idInstance } = useGetInstanceData();

  const { chats, lastMessageInChats, mutateAsync, chatsList, isPending } = useChats(
    lastIncomingMessages,
    lastOutgoingMessages
  );

  const { isModalOpen, openModal } = useModal();

  useEffect(() => {
    const fetchContacts = async () => {
      await Promise.all(
        chats.map((chatId) =>
          mutateAsync({
            apiTokenInstance,
            data: { chatId },
            idInstance
          })
        )
      );
    };

    fetchContacts();
  }, [chats]);

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
      <input
        type='text'
        placeholder='Поиск'
        className='border border-slate-200 rounded-md px-3 py-1 focus:outline-green-200 text-sm h-9 w-full'
      />
      {isPending ? (
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
