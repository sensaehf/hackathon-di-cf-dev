import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class MortgageInterest {
  @Field(() => ID)
  @IsString()
  id!: string;

  @Field()
  @IsNumber()
  taxSubmissionId?: number;

  @IsString()
  @Field()
  lenderName?: string;

  @IsString()
  @Field()
  type?: string;

  @IsString()
  @Field()
  startDate?: string;

  @Field()
  @IsNumber()
  termYears?: number;

  @Field()
  @IsNumber()
  purchaseYear?: number;

  @Field()
  @IsNumber()
  totalAnnualPayments?: number;

  @Field()
  @IsNumber()
  principalRepayment?: number;

  @Field()
  @IsNumber()
  interestAmount?: number;

  @Field()
  @IsNumber()
  outstandingBalance?: number;

  @Field()
  @IsNumber()
  year?: number;

  @Field()
  @IsString()
  currency?: string;
}