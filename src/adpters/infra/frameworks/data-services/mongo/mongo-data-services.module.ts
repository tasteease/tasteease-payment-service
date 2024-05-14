import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Checkout, CheckoutSchema, Health, HealthSchema } from './models';
import { MongoDataServices } from './mongo-data-services.service';
import { IDataServices } from '@/core/abstracts/data-services.abstract';
import { DATA_BASE_CONFIGURATION } from '@/adpters/infra/config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
      { name: Health.name, schema: HealthSchema },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          DATA_BASE_CONFIGURATION.mongoConnectionString,
        ),
      }),
    }),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
