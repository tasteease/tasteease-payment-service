import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './presentation/api/controllers/app/app.controller';
import { GetHealthUseCase } from './core/use-cases/app/get-health.use-case';
import { CheckoutController } from './presentation/api/controllers/checkout/checkout.controller';
import { MakePaymentUseCase } from './core/use-cases/checkout/make-payment.use-case';
import { MakePaymentFactory } from './core/factories/checkout.fectory';
import { ProcessPaymentUseCase } from './core/use-cases/checkout/process-payment.use-case';

@Module({
  imports: [],
  controllers: [AppController, CheckoutController],
  providers: [
    AppService,
    GetHealthUseCase,
    MakePaymentUseCase,
    MakePaymentFactory,
    ProcessPaymentUseCase,
  ],
})
export class AppModule {}
