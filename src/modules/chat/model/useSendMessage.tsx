import { useState } from "react";

import { useSendMessageMutation } from "@shared/api/hooks";
import { queryClient } from "@shared/constants";
import { useGetInstanceData } from "@shared/hooks";
import { formatePhone } from "@shared/lib";

export const useSendMessage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { apiTokenInstance, idInstance } = useGetInstanceData();
  const sendMessageMutation = useSendMessageMutation({
    options: {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["getChatHistory"] });
      }
    }
  });

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTextMessage(event.target.value);

  const sendMessage = async (chatId: string) =>
    sendMessageMutation.mutateAsync({
      apiTokenInstance,
      idInstance,
      messageData: {
        chatId: `${formatePhone(chatId)}@c.us`,
        message: textMessage
      }
    });

  return { textMessage, onChangeInput, sendMessage };
};
