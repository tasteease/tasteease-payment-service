import { Test, TestingModule } from '@nestjs/testing';
import { IHttpClientServices } from '@/core/abstracts/http-client.abstract';
import { TesteEaseHttpClient } from './testeease.http-cliente';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { describe } from 'node:test';

describe('TesteEaseHttpClientModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        {
          provide: IHttpClientServices,
          useClass: TesteEaseHttpClient,
        },
      ],
      exports: [IHttpClientServices],
    }).compile();
  });

  describe('GIVEN taste ease core http client', () => {
    it('SHOULD be defined', () => {
      const httpClient: IHttpClientServices =
        module.get<IHttpClientServices>(IHttpClientServices);
      expect(httpClient).toBeDefined();
    });

    it('SHOULD be an instance of TesteEaseHttpClient', () => {
      const httpClient: IHttpClientServices =
        module.get<IHttpClientServices>(IHttpClientServices);
      expect(httpClient).toBeInstanceOf(TesteEaseHttpClient);
    });

    test('SHOULD be able to make get request', async () => {
      const httpClient: IHttpClientServices =
        module.get<IHttpClientServices>(IHttpClientServices);
      expect(httpClient.get).toBeDefined();
    });

    it('SHOULD have get method', () => {
      const httpClient: IHttpClientServices =
        module.get<IHttpClientServices>(IHttpClientServices);
      expect(httpClient.get).toBeDefined();
    });

    it('SHOULD have post method', () => {
      const httpClient: IHttpClientServices =
        module.get<IHttpClientServices>(IHttpClientServices);
      expect(httpClient.post).toBeDefined();
    });
  });
});
