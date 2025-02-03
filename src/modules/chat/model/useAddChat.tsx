import { useForm } from "react-hook-form";

import { useCheckWhatsAppMutation } from "@shared/api/hooks";
import { LOCAL_STORAGE } from "@shared/constants";
import { formatePhone } from "@shared/lib";

export const useAddChat = () => {
  const apiTokenInstance = localStorage.getItem(LOCAL_STORAGE.API_TOKEN_INSTANCE) as string;
  const idInstance = localStorage.getItem(LOCAL_STORAGE.ID_INSTANCE) as string;

  const checkWhatsAppMutation = useCheckWhatsAppMutation();
  const addChatForm = useForm<{ phone: string }>({
    defaultValues: {
      phone: ""
    }
  });

  const isValid = !addChatForm.formState.dirtyFields.phone;
  const isLoading = checkWhatsAppMutation.isPending;

  const addChat = async (data: { phone: string }) => {
    const formatedPhone = formatePhone(data.phone);
    if (formatedPhone.length < 11) {
      addChatForm.setError("phone", {
        message: "Невалидный номер",
        type: "min"
      });
      return;
    }

    await checkWhatsAppMutation.mutateAsync(
      {
        apiTokenInstance,
        idInstance,
        phoneNumber: formatedPhone
      },
      {
        onSuccess: (responseData) => {
          console.log(responseData.data);
        }
      }
    );
  };

  return { isValid, addChatForm, addChat, isLoading };
};
