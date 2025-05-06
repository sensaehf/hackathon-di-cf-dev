import { ApiProperty } from '@nestjs/swagger';

export class CreateReliabilityDto {
  @ApiProperty()
  taxSubmissionId!: number;

  @ApiProperty()
  description!: string;

  @ApiProperty()
  interestAmount!: number;

  @ApiProperty()
  balance!: number;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  currency!: string;
}