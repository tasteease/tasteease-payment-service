import { ProcessPaymentUseCase } from './process-payment.use-case';
import { ProcessPaymentInputDto } from '../../../presentation/api/views/checkout/process-payment.input.dto';
import { IDataServices } from '@/core/abstracts/data-services.abstract';

describe('ProcessPaymentUseCase', () => {
  let useCase: ProcessPaymentUseCase;
  let dataServices: IDataServices;

  beforeEach(() => {
    useCase = new ProcessPaymentUseCase(dataServices);
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
