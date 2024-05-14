import { Health } from '@/core/entities/Health';
import { IApiResponseView } from '../../contracts/IApiResponseView';

export class AppHealthOutputDto implements IApiResponseView<Health> {
  error: boolean;
  message: string;
  data: Health;

  constructor({ error, message, data }) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}
