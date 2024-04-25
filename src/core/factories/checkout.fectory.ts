import { Injectable } from '@nestjs/common';
import { Checkout } from '../entities/Checkout';

import { UUID, randomUUID } from 'crypto';
export interface makePaymentResquest {
  paymentId: UUID;
  clientId: UUID;
  amount: number;
}

export interface ICheckoutFectory {
  createCheckout(requeste: makePaymentResquest): Checkout;
}

@Injectable()
export class MakePaymentFactory implements ICheckoutFectory {
  createCheckout(request: makePaymentResquest): Checkout {
    return new Checkout({
      id: randomUUID(),
      paymentId: request.paymentId,
      clientId: request.clientId,
      amount: request.amount,
      paymentLink: 'http://payment-link.com',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
