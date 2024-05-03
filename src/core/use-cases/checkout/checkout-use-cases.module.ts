import { Module } from '@nestjs/common';
import { DataServicesModule } from '@/adpters/infra/services/data-services/data-service.module';
import { MakePaymentUseCase } from './make-payment.use-case';
import { ProcessPaymentUseCase } from './process-payment.use-case';
import { MakePaymentFactory } from '@/core/factories/checkout.fectory';

@Module({
  imports: [DataServicesModule],
  providers: [MakePaymentUseCase, ProcessPaymentUseCase, MakePaymentFactory],
  exports: [MakePaymentUseCase, ProcessPaymentUseCase, MakePaymentFactory],
})
export class CheckoutUseCasesModule {}
