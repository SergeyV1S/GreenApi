import type { IInstance, ITextMessage } from "@shared/types";

import { api } from "../instance";

export interface IGetChatHistoryParams extends IInstance {
  data: { chatId: string; count: number };
}

export const getChatHistory = ({ config, params }: TRequestConfig<IGetChatHistoryParams>) =>
  api.post<ITextMessage[]>(
    `/waInstance${params.idInstance}/getChatHistory/${params.apiTokenInstance}`,
    params.data,
    config
  );
