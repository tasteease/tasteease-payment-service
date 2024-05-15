import { Checkout } from '@/core/entities/Checkout';
import { ApiProperty } from '@nestjs/swagger';

export class MakePaymentOutputDto {
  @ApiProperty({
    type: String,
    example: 'ORDER_ID-b00d52f1-f1f3-4553-a96b-acf791d8831e',
  })
  orderId: string;
  @ApiProperty({
    type: String,
    example: 'https://paystack.com/pay/xyz',
  })
  paymentLink: string;

  constructor(checkout: Checkout) {
    this.orderId = `ORDER_ID-${checkout.orderId}`;
    this.paymentLink = checkout.paymentLink;
  }
}
