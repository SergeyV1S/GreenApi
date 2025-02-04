import { useQuery } from "@tanstack/react-query";

import { getLastOutgoingMessages } from "../requests";

export const useGetLastOutgoingMessagesQuery = ({
  config,
  options
}: IQuerySettings<typeof getLastOutgoingMessages>) =>
  useQuery({
    queryKey: ["getLastOutgoingMessages"],
    queryFn: () => getLastOutgoingMessages({ config, params: config?.params }),
    ...options
  });
