import { Health } from '@/core/entities/Health';
import { IApiResponseView } from '../../contracts/IApiResponseView';
import { ApiProperty } from '@nestjs/swagger';

export class AppHealthOutputDto implements IApiResponseView<Health> {
  @ApiProperty({ type: Boolean, example: false })
  error: boolean;
  @ApiProperty({ type: String, example: 'Health check' })
  message: string;
  @ApiProperty({ type: Health })
  data: Health;

  constructor({ error, message, data }) {
    this.error = error;
    this.message = message;
    this.data = data;
  }
}
