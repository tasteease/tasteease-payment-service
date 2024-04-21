export interface IApiResponseView<T> {
  error: boolean;
  message: string;
  data: T;
}
