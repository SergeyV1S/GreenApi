import { EllipsisVerticalIcon, MessageSquarePlusIcon } from "lucide-react";

import { useModal } from "@shared/context";
import { Modal } from "@shared/ui";

import { AddChatForm } from "./AddChatForm";
import { ChatItem } from "./ChatItem";

export const Chats = () => {
  const { isModalOpen, openModal } = useModal();

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
        <ChatItem chatId='1' />
        <ChatItem chatId='2' />
        <ChatItem chatId='3' />
      </div>
      {isModalOpen && (
        <Modal>
          <AddChatForm />
        </Modal>
      )}
    </div>
  );
};
