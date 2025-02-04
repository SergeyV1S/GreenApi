import { useMutation } from "@tanstack/react-query";

import type { IPostCheckWhatsAppParams } from "../requests";
import { postCheckWhatsApp } from "../requests";

export const useCheckWhatsAppMutation = (
  settings?: IMutationSettings<IPostCheckWhatsAppParams, typeof postCheckWhatsApp>
) =>
  useMutation({
    mutationKey: ["postCheckWhatsApp"],
    mutationFn: (params: IPostCheckWhatsAppParams) =>
      postCheckWhatsApp({
        params,
        config: settings?.config
      }),
    ...settings?.options
  });
