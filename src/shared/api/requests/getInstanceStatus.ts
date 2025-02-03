import type { IInstance } from "@shared/types";

import { api } from "../instance";

export interface IGetInstanceStatusResponse {
  stateInstance: string;
}

export const getInstanceStatus = ({ config, params }: TRequestConfig<IInstance>) =>
  api.get<IGetInstanceStatusResponse>(
    `/waInstance${params.idInstance}/getStateInstance/${params.apiTokenInstance}`,
    config
  );
