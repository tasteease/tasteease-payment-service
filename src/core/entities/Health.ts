import { UUID } from 'crypto';
import { ApiProperty } from '@nestjs/swagger';

export class Health {
  @ApiProperty({ type: String, example: '2021-09-02T00:00:00.000Z' })
  id: UUID;
  @ApiProperty({ type: String, example: 'ok' })
  status: string;
  @ApiProperty({ type: String, example: '1.0.0' })
  version: string;

  constructor(health: Partial<Health>) {
    Object.assign(this, health);
  }
}
