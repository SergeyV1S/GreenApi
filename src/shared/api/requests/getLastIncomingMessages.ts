import type { IInstance, ITextMessage } from "@shared/types";

import { api } from "../instance";

export interface IGetLastIncomingMessagesParams extends IInstance {
  minutes?: number;
}

export const getLastIncomingMessages = ({
  config,
  params
}: TRequestConfig<IGetLastIncomingMessagesParams>) =>
  api.get<ITextMessage[]>(
    `/waInstance${params.idInstance}/lastIncomingMessages/${params.apiTokenInstance}?minutes=${params.minutes || 1440}`,
    config
  );
