import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class MakePaymentInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentId: UUID;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientId: UUID;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  amount: number;
}
