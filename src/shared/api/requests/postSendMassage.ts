import type { IMessage } from "@shared/types";
import type { IInstance } from "@shared/types";

import { api } from "../instance";

export interface IPostSendMassageResponse {
  stateInstance: string;
}

export interface IPostSendMassageParams extends IInstance {
  messageData: IMessage;
}

export const postSendMassage = ({ config, params }: TRequestConfig<IPostSendMassageParams>) =>
  api.post<IPostSendMassageResponse>(
    `/waInstance${params.idInstance}/sendMessage/${params.apiTokenInstance}`,
    params.messageData,
    config
  );
