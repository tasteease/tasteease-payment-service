import { Checkout } from '@/core/entities/Checkout';

export class MakePaymentOutputDto {
  orderId: string;
  paymentLink: string;

  constructor(checkout: Checkout) {
    this.orderId = checkout.id;
    this.paymentLink = checkout.paymentLink;
  }
}
