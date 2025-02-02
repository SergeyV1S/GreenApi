import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button, Input, PasswordInput } from "@shared/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shared/ui/form";

import { signInMailSchema } from "../lib/signInMailSchema";

interface MailFormProps {
  onSubmit: (values: z.infer<typeof signInMailSchema>) => Promise<void>;
  switchForm: () => void;
  isPending: boolean;
}

export const EmailForm = ({ onSubmit, switchForm, isPending }: MailFormProps) => {
  const signInMailForm = useForm<z.infer<typeof signInMailSchema>>({
    resolver: zodResolver(signInMailSchema),
    defaultValues: {
      mail: "",
      password: ""
    }
  });

  return (
    <Form {...signInMailForm}>
      <form onSubmit={signInMailForm.handleSubmit(onSubmit)} className='grid gap-4'>
        <FormField
          control={signInMailForm.control}
          name='mail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder='Электронная почта' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={signInMailForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput autoComplete='off' placeholder='Пароль' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={switchForm} size='sm' variant='link' type='button'>
          Войти по номеру телефона
        </Button>
        <Button
          disabled={
            !signInMailForm.formState.dirtyFields.password ||
            !signInMailForm.formState.dirtyFields.mail ||
            isPending
          }
          type='submit'
          className='w-full'
        >
          Войти по номеру телефона
        </Button>
      </form>
    </Form>
  );
};
