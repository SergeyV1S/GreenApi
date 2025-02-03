import { UserRoundIcon } from "lucide-react";

export const ChatItem = () => (
  <div className='w-full relative py-5 first:pt-0'>
    <div className='flex items-center gap-4'>
      <div className='rounded-full bg-slate-200'>
        <UserRoundIcon size={49} className='text-white p-1' />
      </div>
      <div className='space-y-1.5'>
        <p>Руслан</p>
        <p className='truncate text-xs w-2/3'>
          Привет, я хотел уточнить, идешь ли ты завтра в кафе?
        </p>
      </div>
    </div>
    <p className='absolute top-4 right-1 text-xs opacity-70'>19:34</p>
  </div>
);
