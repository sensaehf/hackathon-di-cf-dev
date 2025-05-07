import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator'

export class CreateReliabilityDto {

  @ApiProperty()
  @IsNumber()
  taxSubmissionId!: number;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNumber()
  interestAmount!: number;

  @ApiProperty()
  @IsNumber()
  balance!: number;

  @ApiProperty()
  @IsNumber()
  year!: number;

  @ApiProperty()
  @IsString()
  currency!: string;
}