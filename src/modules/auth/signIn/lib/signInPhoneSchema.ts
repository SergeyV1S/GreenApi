import { z } from "zod";

import { formatePhone } from "@shared/lib";

export const signInPhoneSchema = z.object({
  phone: z.string().refine((phone) => {
    const formatedPhone = formatePhone(phone);
    return formatedPhone.length === 12;
  }, "Неверный номер телефона"),
  password: z.string()
});
