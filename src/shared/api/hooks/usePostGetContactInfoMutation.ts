import { useMutation } from "@tanstack/react-query";

import type { IGetContactInfoParams } from "../requests";
import { getContactInfo } from "../requests";

export const usePostGetContactInfoMutation = (
  settings?: IMutationSettings<IGetContactInfoParams, typeof getContactInfo>
) =>
  useMutation({
    mutationKey: ["getContactInfo"],
    mutationFn: (params: IGetContactInfoParams) =>
      getContactInfo({
        params,
        config: settings?.config
      }),
    ...settings?.options
  });
