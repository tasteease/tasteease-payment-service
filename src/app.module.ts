import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './presentation/api/controllers/app.controller';
import { GetHealthUseCase } from './core/use-cases/get-health.use-case';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GetHealthUseCase],
})
export class AppModule {}
