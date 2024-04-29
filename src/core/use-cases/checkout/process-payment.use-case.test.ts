import { ProcessPaymentUseCase } from './process-payment.use-case';
import { ProcessPaymentInputDto } from '../../../presentation/api/views/checkout/process-payment.input.dto';

describe('ProcessPaymentUseCase', () => {
  let useCase: ProcessPaymentUseCase;

  beforeEach(() => {
    useCase = new ProcessPaymentUseCase();
  });

  describe('GIVEN new instance of Process Payment use case', () => {
    it('SHOULD return true', async () => {
      // Arrange
      const processPaymentInputDto: ProcessPaymentInputDto = {
        paid: true,
        paidDate: new Date(),
        reference: 'reference',
      };

      // Act
      const result = await useCase.execute(processPaymentInputDto);

      // Assert
      expect(result).toBe(true);
    });
  });
});
