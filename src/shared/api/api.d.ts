/* eslint-disable @typescript-eslint/consistent-type-imports */
type TRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import("axios").AxiosRequestConfig }
  : { params: Params; config?: import("axios").AxiosRequestConfig };

interface IMutationSettings<Params = void, Func = unknown> {
  config?: import("axios").AxiosRequestConfig;
  options?: import("@tanstack/react-query").UseMutationOptions<
    Awaited<ReturnType<Func>>,
    any,
    Params,
    any
  >;
}

interface IQuerySettings<Func = unknown> {
  config?: import("axios").AxiosRequestConfig;
  options?: Omit<
    import("@tanstack/react-query").UseQueryOptions<
      Awaited<ReturnType<Func>>,
      any,
      Awaited<ReturnType<Func>>,
      any
    >,
    "queryKey"
  >;
}
