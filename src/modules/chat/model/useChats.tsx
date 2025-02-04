import { useState } from "react";

import { usePostGetContactInfoMutation } from "@shared/api/hooks";
import type { IContactInfo, ITextMessage } from "@shared/types";

export const useChats = (
  lastIncomingMessages: ITextMessage[],
  lastOutgoingMessages: ITextMessage[]
) => {
  const [chatsList, setChatsList] = useState<IContactInfo[]>([]);

  const { mutateAsync, isPending } = usePostGetContactInfoMutation({
    options: {
      onSuccess(data) {
        setChatsList((prev) => [...prev, data.data]);
      }
    }
  });

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

  return {
    lastMessageInChats,
    chats,
    chatsList,
    mutateAsync,
    setChatsList,
    isPending
  };
};
