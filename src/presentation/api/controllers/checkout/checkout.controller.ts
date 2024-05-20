import { Controller, Post, Body } from '@nestjs/common';
import { MakePaymentUseCase } from '@/core/use-cases/checkout/make-payment.use-case';
import { MakePaymentInputDto } from '../../views/checkout/make-payment.input.dto';
import { MakePaymentOutputDto } from '../../views/checkout/make-payment.output.dto';
import { MakePaymentResponseView } from '../../views/checkout/make-payment.response';
import { ProcessPaymentInputDto } from '../../views/checkout/process-payment.input.dto';
import { ProcessPaymentUseCase } from '@/core/use-cases/checkout/process-payment.use-case';
import { ProcessPaymentResponseView } from '../../views/checkout/process-payment.response';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly makePaymentUseCase: MakePaymentUseCase,
    private readonly processPaymentUseCase: ProcessPaymentUseCase,
  ) {}

  @ApiOperation({ summary: 'Make payment' })
  @ApiResponse({
    status: 200,
    description: 'Payment successful',
    type: MakePaymentResponseView,
  })
  @ApiResponse({
    status: 400,
    description: 'Payment failed',
    type: MakePaymentResponseView,
  })
  @ApiTags('Checkout')
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

  @ApiOperation({ summary: 'Process payment' })
  @ApiResponse({
    status: 200,
    description: 'Payment processed successfully',
    type: ProcessPaymentResponseView,
  })
  @ApiResponse({
    status: 400,
    description: 'Payment processing failed',
    type: ProcessPaymentResponseView,
  })
  @ApiTags('Checkout')
  @Post('process')
  async process(@Body() body: ProcessPaymentInputDto): Promise<any> {
    try {
      const respostadoexecute = await this.processPaymentUseCase.execute(body);

      if (respostadoexecute)
        return new ProcessPaymentResponseView<{ message: string }>({
          error: false,
          message: 'Payment processement',
          data: { message: 'Payment processed successfully' },
        });
    } catch (error) {
      console.log('error', error.response.data);
      return new MakePaymentResponseView({
        error: true,
        message: error.message,
        data: null,
      });
    }
  }
}
