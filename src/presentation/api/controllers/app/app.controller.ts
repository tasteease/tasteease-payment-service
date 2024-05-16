import { Controller, Get } from '@nestjs/common';
import { GetHealthUseCase } from '../../../../core/use-cases/app/get-health.use-case';
import { AppHealthOutputDto } from '../../views/app/app-health-output.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly healthUseCase: GetHealthUseCase) {}

  @ApiOperation({ summary: 'Get app health' })
  @ApiResponse({
    status: 200,
    description: 'App health',
    type: AppHealthOutputDto,
  })
  @ApiTags('App Health')
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
