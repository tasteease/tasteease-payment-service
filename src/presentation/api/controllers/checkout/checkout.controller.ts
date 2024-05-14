import { Controller, Post, Body } from '@nestjs/common';
import { MakePaymentUseCase } from '@/core/use-cases/checkout/make-payment.use-case';
import { MakePaymentInputDto } from '../../views/checkout/make-payment.input.dto';
import { MakePaymentOutputDto } from '../../views/checkout/make-payment.output.dto';
import { MakePaymentResponseView } from '../../views/checkout/make-payment.response';
import { ProcessPaymentInputDto } from '../../views/checkout/process-payment.input.dto';
import { ProcessPaymentUseCase } from '@/core/use-cases/checkout/process-payment.use-case';
import { ProcessPaymentResponseView } from '../../views/checkout/process-payment.response';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly makePaymentUseCase: MakePaymentUseCase,
    private readonly processPaymentUseCase: ProcessPaymentUseCase,
  ) {}

  @Post('pay')
  async pay(@Body() body: MakePaymentInputDto): Promise<any> {
    try {
      const checkout = await this.makePaymentUseCase.execute(body);

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

  @Post('process')
  async process(@Body() body: ProcessPaymentInputDto): Promise<any> {
    try {
      if (await this.processPaymentUseCase.execute(body))
        return new ProcessPaymentResponseView<{ message: string }>({
          error: false,
          message: 'Payment processement',
          data: { message: 'Payment processed successfully' },
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
