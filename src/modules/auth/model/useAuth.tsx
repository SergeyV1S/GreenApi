import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getInstanceStatus } from "@shared/api";
import { LOCAL_STORAGE, PATHS } from "@shared/constants";
import type { IInstance } from "@shared/types";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authForm = useForm<IInstance>({
    defaultValues: {
      idInstance: "",
      apiTokenInstance: ""
    }
  });
  const navigate = useNavigate();

  const isValid =
    !authForm.formState.dirtyFields.apiTokenInstance || !authForm.formState.dirtyFields.idInstance;

  const signIn = async (data: IInstance) => {
    if (!/^\d+$/.test(data.idInstance)) {
      authForm.setError("idInstance", {
        message: "Поле должно содержать только цифры",
        type: "valueAsNumber"
      });
      return;
    }

    setIsLoading(true);
    await getInstanceStatus({ params: data })
      .then((res) => {
        if (res.data.stateInstance === "notAuthorized") {
          console.log("Ваш instance неавторизован, вы можете авторизовать его в личном кабинете");
          return;
        }
        localStorage.setItem(LOCAL_STORAGE.ID_INSTANCE, data.idInstance);
        localStorage.setItem(LOCAL_STORAGE.API_TOKEN_INSTANCE, data.apiTokenInstance);
        navigate(PATHS.ROOT);
      })
      .catch(() => {
        console.log("Ваш instance неавторизован, вы можете авторизовать его в личном кабинете");
      })
      .finally(() => setIsLoading(false));
  };

  return { authForm, signIn, isValid, isLoading };
};
