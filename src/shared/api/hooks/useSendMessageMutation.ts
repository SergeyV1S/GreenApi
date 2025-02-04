import { useMutation } from "@tanstack/react-query";

import type { IPostSendMassageParams } from "../requests";
import { postSendMassage } from "../requests";

export const useSendMessageMutation = (
  settings?: IMutationSettings<IPostSendMassageParams, typeof postSendMassage>
) =>
  useMutation({
    mutationKey: ["postSendMassage"],
    mutationFn: (params: IPostSendMassageParams) =>
      postSendMassage({
        params,
        config: settings?.config
      }),
    ...settings?.options
  });
