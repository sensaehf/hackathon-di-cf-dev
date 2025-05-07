import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNumber, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateMortgageDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  id!: string

  @ApiProperty()
  @IsString()
  @Type(() => String)
  lenderName!: string

  @ApiProperty()
  @IsString()
  @Type(() => String)
  type!: string

  @ApiProperty()
  @IsString()
  @Type(() => String)
  description!: string

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  startDate!: Date

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  termYears!: number

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  purchaseYear!: number

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  totalAnnualPayments!: number

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  principalRepayment!: number

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  interestAmount!: number

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  outstandingBalance!: number

  @ApiProperty()
  @IsString()
  @Type(() => String)
  currency!: string
}
