import { Controller, Get } from '@nestjs/common';
import { GetHealthUseCase } from '../../../../core/use-cases/app/get-health.use-case';
import { AppHealthOutputDto } from '../../views/app/app-health-output.dto';

@Controller()
export class AppController {
  constructor(private readonly healthUseCase: GetHealthUseCase) {}

  @Get()
  async getHello(): Promise<AppHealthOutputDto> {
    const health = await this.healthUseCase.execute();
    return new AppHealthOutputDto({
      error: false,
      message: 'Health check',
      data: health,
    });
  }
}
