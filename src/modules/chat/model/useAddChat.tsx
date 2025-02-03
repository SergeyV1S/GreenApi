import { useForm } from "react-hook-form";

import { formatePhone } from "@shared/lib";

export const useAddChat = () => {
  const addChatForm = useForm<{ phone: string }>({
    defaultValues: {
      phone: ""
    }
  });

  const isValid = !addChatForm.formState.dirtyFields.phone;

  const addChat = (data: { phone: string }) => {
    const formatedPhone = formatePhone(data.phone);
    if (formatedPhone.length < 11) {
      addChatForm.setError("phone", {
        message: "Невалидный номер",
        type: "min"
      });
      return;
    }
  };

  return { isValid, addChatForm, addChat };
};
