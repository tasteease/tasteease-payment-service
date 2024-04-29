import { Injectable } from '@nestjs/common';
import { MakePaymentInputDto } from '@/presentation/api/views/checkout/make-payment.input.dto';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';
import { Checkout } from '@/core/entities/Checkout';

@Injectable()
export class MakePaymentUseCase {
  constructor(private readonly makePaymentFactory: MakePaymentFactory) {}

  async execute(makePaymentInputDto: MakePaymentInputDto): Promise<Checkout> {
    const checkout =
      this.makePaymentFactory.createCheckout(makePaymentInputDto);

    // get external service to payment link
    // await this.paymentService.getPaymentLink(checkout);

    //set payment link to checkout
    // checkout.paymentLink = paymentLink;

    // save checkout
    // await this.checkoutRepository.save(checkout);

    return new Promise((resolve) => {
      resolve(checkout);
    });
  }
}
