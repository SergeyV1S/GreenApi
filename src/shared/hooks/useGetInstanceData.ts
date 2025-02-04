import { LOCAL_STORAGE } from "@shared/constants";

export const useGetInstanceData = () => {
  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE) as string;
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE) as string;

  return { apiTokenInstance, idInstance };
};
