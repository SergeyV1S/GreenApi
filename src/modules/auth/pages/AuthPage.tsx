import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

import { PATHS } from "@shared/constants";

import { useAuth } from "../model";

const AuthPage = () => {
  const { authForm, signIn, isValid, isLoading } = useAuth();

  return (
    <main className='flex min-h-screen items-center justify-center bg-slate-200'>
      <div className='max-2xl:hidden fixed top-0 w-full bg-green-600 h-32' />
      <section className='w-full z-50 flex items-center justify-center'>
        <div className='bg-white p-10 rounded-2xl size-[400px] h-auto space-y-6'>
          <h1 className='text-2xl font-semibold text-center'>Авторизация</h1>
          <form
            onSubmit={authForm.handleSubmit(signIn)}
            className='w-full flex flex-col items-center'
          >
            <div className='flex flex-col gap-6'>
              <label htmlFor='idInstance' className='space-y-2'>
                idInstance
                <input
                  type='text'
                  placeholder='Введите значение id инстанса'
                  className='border border-slate-200 rounded-md px-3 py-1 focus:outline-green-200 text-sm h-9 w-full'
                  {...authForm.register("idInstance")}
                />
                <p className='text-xs text-red-600 font-medium'>
                  {authForm.formState.errors.idInstance?.message}
                </p>
              </label>
              <label htmlFor='apiTokenInstance' className='space-y-2'>
                apiTokenInstance
                <input
                  type='text'
                  placeholder='Введите значение токена инстанса'
                  className='border border-slate-200 rounded-md px-3 py-1 focus:outline-green-200 text-sm h-9 w-full'
                  {...authForm.register("apiTokenInstance")}
                />
                <p className='text-xs text-red-600 font-medium'>
                  {authForm.formState.errors.apiTokenInstance?.message}
                </p>
              </label>
            </div>
            <button
              disabled={isValid}
              className='w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md disabled:opacity-60'
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export const authPageCreateRoute = (): RouteObject => ({
  path: PATHS.AUTH,
  element: (
    <Suspense fallback={<div>f</div>}>
      <AuthPage />
    </Suspense>
  )
});
