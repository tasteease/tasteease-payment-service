import { IApiResponseView } from '../../contracts/IApiResponseView';
import { MakePaymentOutputDto } from './make-payment.output.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MakePaymentResponseView
  implements IApiResponseView<MakePaymentOutputDto>
{
  @ApiProperty({ type: Boolean, example: false })
  error: boolean;
  @ApiProperty({ type: String, example: 'Payment successful' })
  message: string;
  @ApiProperty({ type: MakePaymentOutputDto })
  data: MakePaymentOutputDto;

  constructor({ error, message, data }) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}
