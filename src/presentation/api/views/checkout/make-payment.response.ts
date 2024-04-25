import { IApiResponseView } from '../../contracts/IApiResponseView';
import { MakePaymentOutputDto } from './make-payment.output.dto';

export class MakePaymentResponseView
  implements IApiResponseView<MakePaymentOutputDto>
{
  error: boolean;
  message: string;
  data: MakePaymentOutputDto;

  constructor({ error, message, data }) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}
