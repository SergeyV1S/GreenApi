import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";

import { useAddChat } from "../model";

export const AddChatForm = () => {
  const { addChatForm, addChat, isValid } = useAddChat();

  return (
    <div className='bg-white p-10 rounded-2xl h-auto space-y-6'>
      <h2 className='text-2xl font-semibold text-center'>Добавить чат</h2>
      <form
        onSubmit={addChatForm.handleSubmit(addChat)}
        className='w-full flex flex-col items-center'
      >
        <div className='flex flex-col gap-6'>
          <label htmlFor='idInstance' className='space-y-2'>
            Номер телефона*
            <Controller
              name='phone'
              control={addChatForm.control}
              rules={{ required: "Введите номер телефона" }}
              render={({ field }) => (
                <PatternFormat
                  {...field}
                  format='+7 (###) ### ## ##'
                  mask='_'
                  placeholder='Введите номер телефона'
                  className='border border-slate-200 rounded-md px-3 py-1 focus:outline-green-200 text-sm h-9 w-full'
                  onValueChange={(values) => {
                    field.onChange(values.value);
                  }}
                />
              )}
            />
            <p className='text-xs text-red-600 font-medium'>
              {addChatForm.formState.errors.phone?.message}
            </p>
          </label>
        </div>
        <button
          disabled={isValid}
          className='w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md disabled:opacity-60'
        >
          {/* {isLoading ? "Загрузка..." : "Войти"} */}g
        </button>
      </form>
    </div>
  );
};
