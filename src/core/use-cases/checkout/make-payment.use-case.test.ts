import { MakePaymentUseCase } from './make-payment.use-case';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';
import { MakePaymentInputDto } from '../../../presentation/api/views/checkout/make-payment.input.dto';
import { Checkout } from '@/core/entities/Checkout';
import { randomUUID } from 'crypto';

describe('MakePaymentUseCase', () => {
  let useCase: MakePaymentUseCase;
  let makePaymentFactory: MakePaymentFactory;

  beforeEach(() => {
    makePaymentFactory = new MakePaymentFactory();
    useCase = new MakePaymentUseCase(makePaymentFactory);
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
