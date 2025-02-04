import { UserRoundIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn } from "@shared/lib";
import type { ITextMessage } from "@shared/types";

export const ChatItem = ({ chatId, senderContactName, textMessage }: ITextMessage) => (
  <NavLink
    to={chatId}
    className={({ isActive }) =>
      cn("block w-full relative rounded-lg py-5 px-2 hover:bg-green-50", isActive && "bg-green-100")
    }
  >
    <div className='flex items-center gap-3'>
      <div className='rounded-full bg-slate-200'>
        <UserRoundIcon size={49} className='text-white p-1' />
      </div>
      <div className='space-y-1.5'>
        <p>{senderContactName || "Чат"}</p>
        <p className='truncate text-xs w-full'>{textMessage || "Сообщение"}</p>
      </div>
    </div>
    <p className='absolute top-4 right-4 text-xs opacity-70'>19:34</p>
  </NavLink>
);
