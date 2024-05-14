import { MakePaymentUseCase } from './make-payment.use-case';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';
import { MakePaymentInputDto } from '../../../presentation/api/views/checkout/make-payment.input.dto';
import { Checkout } from '@/core/entities/Checkout';
import { randomUUID } from 'crypto';
import { IDataServices } from '@/core/abstracts/data-services.abstract';

describe('MakePaymentUseCase', () => {
  let useCase: MakePaymentUseCase;
  let makePaymentFactory: MakePaymentFactory;
  const dataServices: IDataServices = {
    checkouts: {
      create: jest.fn(),
      update: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
    },
    healths: {
      create: jest.fn(),
      update: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
    },
  };

  beforeEach(() => {
    makePaymentFactory = new MakePaymentFactory();
    useCase = new MakePaymentUseCase(dataServices, makePaymentFactory);
  });

  describe('GIVEN new instance of Make Payment use case', () => {
    it('SHOULD create a new checkout and return it', async () => {
      // Arrange
      const makePaymentInputDto: MakePaymentInputDto = {
        paymentId: randomUUID(),
        clientId: randomUUID(),
        amount: 1000,
      };

      // Act
      const result = await useCase.execute(makePaymentInputDto);

      // Assert
      expect(result).toBeInstanceOf(Checkout);
    });
  });
});
