import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateMortgageInterestInput {
  
  @Field(() => Int)
  @IsNumber()
  taxSubmissionId!: number;

  @Field(() => String)
  @IsString()
  lenderName!: string;

  @Field(() => String)
  @IsString()
  type!: string;

  @Field(() => String)
  @IsString()
  startDate!: string;

  @Field(() => Int)
  @IsNumber()
  termYears!: number;

  @Field(() => Int)
  @IsNumber()
  purchaseYear!: number;

  @Field(() => Float)
  @IsNumber()
  totalAnnualPayments!: number;

  @Field(() => Float)
  @IsNumber()
  principalRepayment!: number;

  @Field(() => Float)
  @IsNumber()
  interestAmount!: number;

  @Field(() => Float)
  @IsNumber()
  outstandingBalance!: number;

  @Field(() => String)
  @IsString()
  currency!: string;
}