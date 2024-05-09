import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from './checkout.controller';
import { MakePaymentUseCase } from '@/core/use-cases/checkout/make-payment.use-case';
import { ProcessPaymentUseCase } from '@/core/use-cases/checkout/process-payment.use-case';
import { MakePaymentInputDto } from '../../views/checkout/make-payment.input.dto';
import { randomUUID } from 'crypto';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';
import { Checkout } from '@/core/entities/Checkout';
import { ProcessPaymentInputDto } from '../../views/checkout/process-payment.input.dto';

describe('CheckoutController', () => {
  let controller: CheckoutController;
  let makePaymentUseCase: MakePaymentUseCase;
  let processPaymentUseCase: ProcessPaymentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [
        ProcessPaymentUseCase,
        MakePaymentUseCase,
        MakePaymentFactory,
      ],
    }).compile();

    controller = module.get<CheckoutController>(CheckoutController);
    makePaymentUseCase = module.get<MakePaymentUseCase>(MakePaymentUseCase);
    processPaymentUseCase = module.get<ProcessPaymentUseCase>(
      ProcessPaymentUseCase,
    );
  });

  const makePaymentInput: MakePaymentInputDto = {
    paymentId: randomUUID(),
    clientId: randomUUID(),
    amount: 100,
  };

  describe('GIVEN request to pay end point', () => {
    describe('WHEN request data is provided', () => {
      it('SHOULD make a payment successfully', async () => {
        jest.spyOn(makePaymentUseCase, 'execute').mockResolvedValue(
          new Checkout({
            orderId: 'ee436e51-12b3-4094-bad5-3dbed3734f59',
            amount: 100,
            clientId: makePaymentInput.clientId,
            paymentId: makePaymentInput.paymentId,
            paymentLink: 'http://payment-link.com',
          }),
        );

        const result = await controller.pay(makePaymentInput);

        expect(result).toEqual({
          error: false,
          message: 'Payment successful',
          data: {
            orderId: 'ee436e51-12b3-4094-bad5-3dbed3734f59',
            paymentLink: 'http://payment-link.com',
          },
        });
      });

      it('SHOULD handle errors during payment', async () => {
        const errorMessage = 'Payment failed';

        jest
          .spyOn(makePaymentUseCase, 'execute')
          .mockRejectedValue(new Error(errorMessage));

        const result = await controller.pay(makePaymentInput);

        expect(result).toEqual({
          error: true,
          message: errorMessage,
          data: null,
        });
      });
    });
  });

  describe('GIVEN request to process payment end point', () => {
    const processPaymentInput: ProcessPaymentInputDto = {
      paid: true,
      paidDate: new Date(),
      reference: 'reference',
    };

    it('SHOULD process a payment successfully', async () => {
      const result = await controller.process(processPaymentInput);

      expect(result).toEqual({
        error: false,
        message: 'Payment processement',
        data: { message: 'Payment processed successfully' },
      });
    });

    it('should handle errors during payment processing', async () => {
      const errorMessage = 'Payment processing failed';
      jest
        .spyOn(processPaymentUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const result = await controller.process(processPaymentInput);

      expect(result).toEqual({
        error: true,
        message: errorMessage,
        data: null,
      });
    });
  });
});
