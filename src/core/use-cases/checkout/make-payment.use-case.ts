import { Injectable } from '@nestjs/common';
import { MakePaymentInputDto } from '@/presentation/api/views/checkout/make-payment.input.dto';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';
import { Checkout } from '@/core/entities/Checkout';
import { IDataServices } from '@/core/abstracts/data-services.abstract';

@Injectable()
export class MakePaymentUseCase {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly makePaymentFactory: MakePaymentFactory,
  ) {}

  async execute(makePaymentInputDto: MakePaymentInputDto): Promise<Checkout> {
    const checkout =
      this.makePaymentFactory.createCheckout(makePaymentInputDto);

    await this.dataServices.checkouts.create(checkout);

    return new Promise((resolve) => {
      resolve(checkout);
    });
  }
}
