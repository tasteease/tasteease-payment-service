import { IApiResponseView } from '../../contracts/IApiResponseView';

export class ProcessPaymentResponseView<T> implements IApiResponseView<T> {
  error: boolean;
  message: string;
  data: T;

  constructor({ error, message, data }) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}
