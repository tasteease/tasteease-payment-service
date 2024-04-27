import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessPaymentInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paid: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paidDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reference: string;
}
