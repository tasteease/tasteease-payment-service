import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CORE_HTTP } from '../../../config';
import { IHttpClientServices } from '@/core/abstracts/http-client.abstract';

@Injectable()
export class TesteEaseHttpClient extends IHttpClientServices {
  private apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    super();
    this.apiUrl = this.configService.get<string>(CORE_HTTP.apiUrl);
  }

  async get<T>(url: string): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(`${this.apiUrl}/${url}`),
    );

    return response.data;
  }

  async post<T>(url: string, body: any): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.post<T>(`${this.apiUrl}/${url}`, body),
    );

    return response.data;
  }
}
