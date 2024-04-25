import { Controller, Post, Body } from '@nestjs/common';
import { MakePaymentUseCase } from 'src/core/use-cases/checkout/make-payment.use-case';
import { MakePaymentInputDto } from '../../views/checkout/make-payment.input.dto';
import { MakePaymentOutputDto } from '../../views/checkout/make-payment.output.dto';
import { MakePaymentResponseView } from '../../views/checkout/make-payment.response';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutUseCase: MakePaymentUseCase) {}

  @Post('pay')
  async pay(@Body() body: MakePaymentInputDto): Promise<any> {
    try {
      const checkout = await this.checkoutUseCase.execute(body);

      return new MakePaymentResponseView({
        error: false,
        message: 'Payment successful',
        data: new MakePaymentOutputDto(checkout),
      });
    } catch (error) {
      return new MakePaymentResponseView({
        error: true,
        message: error.message,
        data: null,
      });
    }
  }
}
