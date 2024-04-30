import { Checkout } from '@/core/entities/Checkout';

export class MakePaymentOutputDto {
  orderId: string;
  paymentLink: string;

  constructor(checkout: Checkout) {
    this.orderId = `ORDER_ID-${checkout.id}`;
    this.paymentLink = checkout.paymentLink;
  }
}