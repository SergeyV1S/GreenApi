import type { IContactInfo, IInstance } from "@shared/types";

import { api } from "../instance";

export interface IGetContactInfoParams extends IInstance {
  data: { chatId: string };
}

export const getContactInfo = ({ config, params }: TRequestConfig<IGetContactInfoParams>) =>
  api.post<IContactInfo>(
    `/waInstance${params.idInstance}/getContactInfo/${params.apiTokenInstance}`,
    params.data,
    config
  );
