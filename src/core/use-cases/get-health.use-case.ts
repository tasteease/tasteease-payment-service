import { Injectable } from '@nestjs/common';
import { Health } from '../entities/Health';

@Injectable()
export class GetHealthUseCase {
  constructor() {}

  async execute(): Promise<Health> {
    const health = new Health({
      status: 'ok',
      version: '1.0.0',
    });

    return new Promise((resolve) => {
      resolve(health);
    });
  }
}
