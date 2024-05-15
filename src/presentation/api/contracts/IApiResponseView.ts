import { ApiProperty } from '@nestjs/swagger';

export class IApiResponseView<T> {
  @ApiProperty({ type: Boolean, example: false })
  error: boolean;
  @ApiProperty({ type: String, example: 'Payment successful' })
  message: string;
  @ApiProperty({ type: 'T' })
  data: T;
}
