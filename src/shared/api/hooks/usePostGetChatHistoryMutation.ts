import { useMutation } from "@tanstack/react-query";

import type { IGetChatHistoryParams } from "../requests";
import { getChatHistory } from "../requests";

export const usePostGetChatHistoryMutation = (
  settings?: IMutationSettings<IGetChatHistoryParams, typeof getChatHistory>
) =>
  useMutation({
    mutationKey: ["getChatHistory"],
    mutationFn: (params: IGetChatHistoryParams) =>
      getChatHistory({
        params,
        config: settings?.config
      }),
    ...settings?.options
  });
