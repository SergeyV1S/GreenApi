import type { IInstance, ITextMessage } from "@shared/types";

import { api } from "../instance";

export interface IGetLastOutgoingMessagesParams extends IInstance {
  minutes?: number;
}

export const getLastOutgoingMessages = ({
  config,
  params
}: TRequestConfig<IGetLastOutgoingMessagesParams>) =>
  api.get<ITextMessage[]>(
    `/waInstance${params.idInstance}/lastOutgoingMessages/${params.apiTokenInstance}?minutes=${params.minutes || 1440}`,
    config
  );
