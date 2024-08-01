import { Module } from '@nestjs/common';
import { DataServicesModule } from '@/adpters/infra/services/data-services/data-service.module';
import { MakePaymentUseCase } from './make-payment.use-case';
import { ProcessPaymentUseCase } from './process-payment.use-case';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';
import { HttpServicesModule } from '@/adpters/infra/services/external-http-services/http-services.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'payment_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    DataServicesModule,
    HttpServicesModule,
  ],
  providers: [MakePaymentUseCase, ProcessPaymentUseCase, MakePaymentFactory],
  exports: [MakePaymentUseCase, ProcessPaymentUseCase, MakePaymentFactory],
})
export class CheckoutUseCasesModule {}
