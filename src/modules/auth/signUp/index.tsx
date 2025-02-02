import { PatternFormat } from "react-number-format";
import { Link } from "react-router-dom";

import { PATHS } from "@shared/constants";
import { Button, Input, PasswordInput } from "@shared/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";

import { useSignUp } from "./model/useSignUp";
import { useSignUpForm } from "./model/useSignUpForm";

const SignUpPage = () => {
  const { onSubmit, registerMutation } = useSignUp();
  const { isDisabled, signUpForm } = useSignUpForm();

  return (
    <Card className='m-auto w-full max-w-fit'>
      <CardHeader>
        <CardTitle className='text-xl'>Регистрация</CardTitle>
        <CardDescription>Введите свои данные для создания учетной записи</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(onSubmit)} className='grid gap-4'>
            <div className='flex items-center gap-5'>
              <FormField
                control={signUpForm.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя*</FormLabel>
                    <FormControl>
                      <Input placeholder='Имя' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                name='secondName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Фамилия*</FormLabel>
                    <FormControl>
                      <Input placeholder='Фамилия' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={signUpForm.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона*</FormLabel>
                  <FormControl>
                    <Input
                      type='text'
                      placeholder='Номер телефона'
                      format='+7 (###) ### ## ##'
                      mask='_'
                      component={PatternFormat}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name='mail'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Электронная почта*</FormLabel>
                  <FormControl>
                    <Input placeholder='Электронная почта' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль*</FormLabel>
                  <FormControl>
                    <PasswordInput autoComplete='off' placeholder='Пароль' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={registerMutation.isPending || isDisabled}
              type='submit'
              className='w-full'
            >
              Зарегистрироваться
            </Button>
          </form>
        </Form>

        <p className='mt-4 text-center text-sm'>
          Уже есть учетная запись?
          <Link to={PATHS.SIGNIN} className='underline'>
            Войти
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
