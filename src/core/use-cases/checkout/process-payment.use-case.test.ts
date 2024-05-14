import { ProcessPaymentUseCase } from './process-payment.use-case';
import { ProcessPaymentInputDto } from '../../../presentation/api/views/checkout/process-payment.input.dto';
import { IDataServices } from '@/core/abstracts/data-services.abstract';

describe('ProcessPaymentUseCase', () => {
  let useCase: ProcessPaymentUseCase;
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

  beforeEach(() => {
    useCase = new ProcessPaymentUseCase(dataServices);
  });

  describe('GIVEN new instance of Process Payment use case', () => {
    it('SHOULD return true', async () => {
      // Arrange
      const processPaymentInputDto: ProcessPaymentInputDto = {
        paid: true,
        paidDate: new Date(),
        reference: 'ORDER_ID-b00d52f1-f1f3-4553-a96b-acf791d8831e',
      };

      // Act
      const result = await useCase.execute(processPaymentInputDto);

      // Assert
      expect(result).toBe(true);
    });
  });
});
