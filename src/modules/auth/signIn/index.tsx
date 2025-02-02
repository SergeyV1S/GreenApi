import { useState } from "react";
import { Link } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { EmailForm } from "./_components/EmailForm";
import { PhoneForm } from "./_components/PhoneForm";
import { useSignIn } from "./model/useSignIn";

const SignInPage = () => {
  const [formType, setFormType] = useState("mail");
  const {
    onSubmit,
    posLoginMutation: { isPending }
  } = useSignIn();

  return (
    <Card className='m-auto w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Войти</CardTitle>
      </CardHeader>
      <CardContent>
        {formType === "mail" && (
          <EmailForm
            onSubmit={onSubmit}
            switchForm={() => setFormType("phone")}
            isPending={isPending}
          />
        )}
        {formType === "phone" && (
          <PhoneForm
            onSubmit={onSubmit}
            switchForm={() => setFormType("mail")}
            isPending={isPending}
          />
        )}
        <div className='mt-4 text-center text-sm'>
          У вас нет учетной записи?
          <Link to={PATHS.SIGNUP} className='underline'>
            Зарегистрироваться
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
