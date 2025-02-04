import type { IInstance } from "@shared/types";

import { api } from "../instance";

export interface IPostCheckWhatsAppResponse {
  existsWhatsapp: boolean;
}

export interface IPostCheckWhatsAppParams extends IInstance {
  phoneNumber: string;
}

export const postCheckWhatsApp = ({ config, params }: TRequestConfig<IPostCheckWhatsAppParams>) =>
  api.post<IPostCheckWhatsAppResponse>(
    `/waInstance${params.idInstance}/checkWhatsapp/${params.apiTokenInstance}`,
    {
      phoneNumber: params.phoneNumber
    },
    config
  );
