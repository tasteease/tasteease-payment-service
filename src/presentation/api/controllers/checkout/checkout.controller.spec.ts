import { CheckoutController } from './checkout.controller';
import { MakePaymentUseCase } from '@/core/use-cases/checkout/make-payment.use-case';
import { ProcessPaymentUseCase } from '@/core/use-cases/checkout/process-payment.use-case';
import { MakePaymentInputDto } from '../../views/checkout/make-payment.input.dto';
import { randomUUID } from 'crypto';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';
import { Checkout } from '@/core/entities/Checkout';
import { ProcessPaymentInputDto } from '../../views/checkout/process-payment.input.dto';
import { IDataServices } from '@/core/abstracts/data-services.abstract';
import { MakePaymentResponseView } from '../../views/checkout/make-payment.response';
import { MakePaymentOutputDto } from '../../views/checkout/make-payment.output.dto';

describe('CheckoutController', () => {
  let checkOutController: CheckoutController;
  let makePaymentUseCase: MakePaymentUseCase;
  let processPaymentUseCase: ProcessPaymentUseCase;

  beforeEach(async () => {
    const dataServices: IDataServices = {
      checkouts: {
        create: jest.fn(),
        update: jest.fn(),
        get: jest.fn(),
        getAll: jest.fn().mockResolvedValue([
          {
            _id: '663c0150154aa9a4e1ad402d',
            orderId: 'b00d52f1-f1f3-4553-a96b-acf791d8831e',
            paymentId: '38d7e5bd-0d04-411d-969f-d8a12a212e80',
            clientId: '15edc7cd-9272-492e-b24c-79831a672ad6',
            amount: 59.9,
            paymentLink: 'http://payment-link.com',
            status: 'pending',
            paid: false,
            createdAt: '2024-05-08T22:48:48.015Z',
            updatedAt: '2024-05-08T22:48:48.015Z',
            __v: 0,
          },
        ]),
      },
      healths: {
        create: jest.fn(),
        update: jest.fn(),
        get: jest.fn(),
        getAll: jest.fn(),
      },
    };

    const makePaymentFactory: MakePaymentFactory = {
      createCheckout: jest.fn(),
    };

    makePaymentUseCase = new MakePaymentUseCase(
      dataServices,
      makePaymentFactory,
    );

    processPaymentUseCase = new ProcessPaymentUseCase(dataServices);

    checkOutController = new CheckoutController(
      makePaymentUseCase,
      processPaymentUseCase,
    );
  });

  const makePaymentInput: MakePaymentInputDto = {
    paymentId: randomUUID(),
    clientId: randomUUID(),
    amount: 100,
  };

  const checkout = {
    orderId: 'ee436e51-12b3-4094-bad5-3dbed3734f59',
    paymentId: makePaymentInput.paymentId,
    clientId: makePaymentInput.clientId,
    amount: makePaymentInput.amount,
    paymentLink: 'http://payment-link.com',
    status: 'pending',
    paid: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('GIVEN request to pay end point', () => {
    describe('WHEN request data is provided', () => {
      it('SHOULD make a payment successfully', async () => {
        jest
          .spyOn(makePaymentUseCase, 'execute')
          .mockResolvedValue(new Checkout(checkout));

        const result = await checkOutController.pay(makePaymentInput);

        expect(result).toEqual(
          new MakePaymentResponseView({
            error: false,
            message: 'Payment successful',
            data: new MakePaymentOutputDto(checkout),
          }),
        );
      });

      it('SHOULD handle errors during payment', async () => {
        const errorMessage = 'Payment failed';

        jest
          .spyOn(makePaymentUseCase, 'execute')
          .mockRejectedValue(new Error(errorMessage));

        const result = await checkOutController.pay(makePaymentInput);

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
      reference: 'ORDER_ID-b00d52f1-f1f3-4553-a96b-acf791d8831e',
    };

    it('SHOULD process a payment successfully', async () => {
      const result = await checkOutController.process(processPaymentInput);

      expect(result).toEqual({
        error: false,
        message: 'Payment processement',
        data: { message: 'Payment processed successfully' },
      });
    });

    it('SHOULD handle errors during payment processing', async () => {
      const errorMessage = 'Payment processing failed';
      jest
        .spyOn(processPaymentUseCase, 'execute')
        .mockRejectedValue(new Error(errorMessage));

      const result = await checkOutController.process(processPaymentInput);

      expect(result).toEqual({
        error: true,
        message: errorMessage,
        data: null,
      });
    });

    it('SHOULD throw error for a non-existing payment', async () => {
      const errorMessage = 'Checkout not found';
      const inputAltered = {
        ...processPaymentInput,
        reference: 'ORDER_ID-38d7e5bd-0d04-411d-969f-d8a12a212e80',
      };

      const result = await checkOutController.process(inputAltered);

      expect(result).toEqual({
        error: true,
        message: errorMessage,
        data: null,
      });
    });

    it('SHOULD throw error for an already paid payment', async () => {
      const errorMessage = 'Checkout already paid';

      const dataServices: IDataServices = {
        checkouts: {
          create: jest.fn(),
          update: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn().mockResolvedValue([
            {
              _id: '663c0150154aa9a4e1ad402d',
              orderId: 'b00d52f1-f1f3-4553-a96b-acf791d8831e',
              paymentId: '38d7e5bd-0d04-411d-969f-d8a12a212e80',
              clientId: '15edc7cd-9272-492e-b24c-79831a672ad6',
              amount: 59.9,
              paymentLink: 'http://payment-link.com',
              status: 'paid',
              paid: true,
              createdAt: '2024-05-08T22:48:48.015Z',
              updatedAt: '2024-05-08T22:48:48.015Z',
              __v: 0,
            },
          ]),
        },
        healths: {
          create: jest.fn(),
          update: jest.fn(),
          get: jest.fn(),
          getAll: jest.fn(),
        },
      };

      processPaymentUseCase = new ProcessPaymentUseCase(dataServices);

      checkOutController = new CheckoutController(
        makePaymentUseCase,
        processPaymentUseCase,
      );

      const result = await checkOutController.process(processPaymentInput);

      expect(result).toEqual({
        error: true,
        message: errorMessage,
        data: null,
      });
    });
  });
});
