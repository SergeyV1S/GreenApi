import { useQuery } from "@tanstack/react-query";

import { getLastIncomingMessages } from "../requests";

export const useGetLastIncomingMessagesQuery = ({
  config,
  options
}: IQuerySettings<typeof getLastIncomingMessages>) =>
  useQuery({
    queryKey: ["getLastIncomingMessages"],
    queryFn: () => getLastIncomingMessages({ config, params: config?.params }),
    ...options
  });
