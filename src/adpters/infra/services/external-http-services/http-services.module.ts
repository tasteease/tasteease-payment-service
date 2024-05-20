import { Module } from '@nestjs/common';
import { TesteEaseHttpClientModule } from '../../frameworks/http-services/testeease/taste-ease.http-cliente.module';

@Module({
  imports: [TesteEaseHttpClientModule],
  exports: [TesteEaseHttpClientModule],
})
export class HttpServicesModule {}
