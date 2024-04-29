import { randomUUID } from 'crypto';
import { MakePaymentFactory } from './checkout.fectory';
import { Checkout } from '@/core/entities/Checkout';

describe('MakePaymentFactory', () => {
  let factory: MakePaymentFactory;

  beforeEach(() => {
    factory = new MakePaymentFactory();
  });

  describe('GIVEN new instance of Checkout Factory ', () => {
    it('SHOULD create a new Checkout instance with the provided request data', () => {
      const request = {
        paymentId: randomUUID(),
        clientId: randomUUID(),
        amount: 100,
      };

      const checkout = factory.createCheckout(request);

      expect(checkout).toBeInstanceOf(Checkout);
      expect(checkout.id).toBeDefined();
      expect(checkout.paymentId).toBe(request.paymentId);
      expect(checkout.clientId).toBe(request.clientId);
      expect(checkout.amount).toBe(request.amount);
      expect(checkout.paymentLink).toBe('http://payment-link.com');
      expect(checkout.status).toBe('pending');
      expect(checkout.paid).toBe(false);
      expect(checkout.createdAt).toBeInstanceOf(Date);
      expect(checkout.updatedAt).toBeInstanceOf(Date);
    });
  });
});
