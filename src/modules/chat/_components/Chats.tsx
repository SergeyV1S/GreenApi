import { EllipsisVerticalIcon, MessageSquarePlusIcon, UserRoundIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { usePostGetContactInfoMutation } from "@shared/api/hooks";
import { LOCAL_STORAGE } from "@shared/constants";
import { useModal } from "@shared/context";
import { cn } from "@shared/lib";
import { formateChatId } from "@shared/lib";
import type { IContactInfo, ITextMessage } from "@shared/types";
import { Modal } from "@shared/ui";

import { AddChatForm } from "./AddChatForm";

interface IChatsProps {
  lastIncomingMessages: ITextMessage[];
  lastOutgoingMessages: ITextMessage[];
}

export const Chats = ({ lastIncomingMessages, lastOutgoingMessages }: IChatsProps) => {
  const chats = [
    ...new Set([
      ...new Set(lastIncomingMessages.map((item) => item.chatId)).values(),
      ...new Set(lastOutgoingMessages.map((item) => item.chatId)).values()
    ]).values()
  ];

  const lastMessageInChats = lastIncomingMessages
    .concat(lastOutgoingMessages)
    .sort((a, b) => b.timestamp - a.timestamp)
    .reduce<Record<string, ITextMessage>>((acc, message) => {
      if (!acc[message.chatId]) {
        acc[message.chatId] = message;
      }
      return acc;
    }, {});

  const { isModalOpen, openModal } = useModal();
  const [chatsList, setChatsList] = useState<IContactInfo[]>([]);
  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE) as string;
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE) as string;
  const postGetContactInfoMutation = usePostGetContactInfoMutation({
    options: {
      onSuccess(data) {
        setChatsList((prev) => [...prev, data.data]);
      },
      retryDelay: 150000
    }
  });

  useEffect(() => {
    const fetchContacts = async () => {
      await Promise.all(
        chats.map((chatId) =>
          postGetContactInfoMutation.mutateAsync({
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
      {isModalOpen && (
        <Modal>
          <AddChatForm />
        </Modal>
      )}
    </div>
  );
};
