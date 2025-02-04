import type { IInstance } from "@shared/types";

import { api } from "../instance";

export interface IGetReceiveNotificationResponse {
  stateInstance: string;
}

export interface IGetReceiveNotificationParams extends IInstance {
  message: string;
}

export const getReceiveNotification = ({
  config,
  params
}: TRequestConfig<IGetReceiveNotificationParams>) =>
  api.get<IGetReceiveNotificationResponse>(
    `/waInstance${params.idInstance}/receiveNotification/${params.apiTokenInstance}`,
    config
  );
