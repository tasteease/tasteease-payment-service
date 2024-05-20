import { Module } from '@nestjs/common';
import { AppController } from './presentation/api/controllers/app/app.controller';
import { CheckoutController } from './presentation/api/controllers/checkout/checkout.controller';
import { DataServicesModule } from './adpters/infra/services/data-services/data-service.module';
import { ConfigModule } from '@nestjs/config';
import { CheckoutUseCasesModule } from './core/use-cases/checkout/checkout-use-cases.module';
import { GetHealthUseCase } from './core/use-cases/app/get-health.use-case';
import { HttpServicesModule } from './adpters/infra/services/external-http-services/http-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataServicesModule,
    HttpServicesModule,
    CheckoutUseCasesModule,
  ],
  controllers: [AppController, CheckoutController],
  providers: [GetHealthUseCase, CheckoutUseCasesModule],
})
export class AppModule {}
