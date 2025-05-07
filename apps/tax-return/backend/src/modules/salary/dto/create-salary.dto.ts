import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateSalaryDto {
  @ApiProperty()
  @IsNumber()
  taxSubmissionId!: number;

  @ApiProperty()
  @IsString()
  employerName!: string;

  @ApiProperty()
  @IsNumber()
  amount!: number;

  @ApiProperty()
  @IsString()
  currency!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsNumber()
  year!: number;
}