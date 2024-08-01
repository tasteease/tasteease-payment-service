import { Module } from '@nestjs/common';
import { TesteEaseHttpClient } from './testeease.http-cliente';
import { HttpModule } from '@nestjs/axios';
import { IHttpClientServices } from '@/core/abstracts/http-client.abstract';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: IHttpClientServices,
      useClass: TesteEaseHttpClient,
    },
  ],
  exports: [IHttpClientServices],
})
export class TesteEaseHttpClientModule {}
