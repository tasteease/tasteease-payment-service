import { Injectable } from '@nestjs/common';
import { ProcessPaymentInputDto } from 'src/presentation/api/views/checkout/process-payment.input.dto';

@Injectable()
export class ProcessPaymentUseCase {
  constructor(/* private readonly checkoutRepository: CheckoutRepository */) {}

  async execute(
    processPaymentInputDto: ProcessPaymentInputDto,
  ): Promise<boolean> {
    console.log('Processing payment...');
    console.log(processPaymentInputDto);
    // get existing checkout
    // const checkout = await this.checkoutRepository.getCheckoutById(processPaymentInputDto.id);

    // if (!checkout) {
    //   throw new Error('Checkout not found');
    // }

    // if (checkout.paid) {
    //   throw new Error('Checkout already paid');
    // }

    // if (processPaymentInputDto.paid) {
    //   checkout.paid = processPaymentInputDto.paid;
    //   checkout.paidDate = processPaymentInputDto.paidDate; // set paid date
    // }

    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
