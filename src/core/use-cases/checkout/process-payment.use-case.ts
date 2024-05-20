import { Injectable } from '@nestjs/common';
import { ProcessPaymentInputDto } from '@/presentation/api/views/checkout/process-payment.input.dto';
import { IDataServices } from '@/core/abstracts/data-services.abstract';
import { IHttpClientServices } from '@/core/abstracts/http-client.abstract';
import { EOrderStatus } from '@/core/enums/order-status.enum';

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    private readonly dataServices: IDataServices,
    private readonly httpClientServices: IHttpClientServices,
  ) {}

  async execute(
    processPaymentInputDto: ProcessPaymentInputDto,
  ): Promise<boolean> {
    const orderId = processPaymentInputDto.reference.split('ORDER_ID-')[1];

    const checkouts = await this.dataServices.checkouts.getAll();

    const checkout = checkouts.find((checkout) => checkout.orderId === orderId);

    if (!checkout) throw new Error('Checkout not found');

    if (checkout.paid) throw new Error('Checkout already paid');

    if (processPaymentInputDto.paid) {
      checkout.status = 'paid';
      checkout.paid = processPaymentInputDto.paid;
      checkout.updatedAt = processPaymentInputDto.paidDate;
    }

    const externalCoreHttpResponse = await this.httpClientServices.post(
      `order/${orderId}/status`,
      {
        status: EOrderStatus.Paid,
      },
    );

    if (!externalCoreHttpResponse) throw new Error('Error on core service');

    await this.dataServices.checkouts.update(orderId, checkout);

    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
