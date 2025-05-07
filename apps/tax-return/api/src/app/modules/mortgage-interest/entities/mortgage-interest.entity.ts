import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class MortgageInterest {
  @Field(() => ID)
  @IsString()
  id!: string;

  @Field({ nullable: true })
  @IsNumber()
  taxSubmissionId?: number;

  @IsString()
  @Field(() => String, { nullable: true })
  lenderName?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  type?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  @IsNumber()
  termYears?: number;

  @Field({ nullable: true })
  @IsNumber()
  purchaseYear?: number;

  @Field({ nullable: true })
  @IsNumber()
  totalAnnualPayments?: number;

  @Field({ nullable: true })
  @IsNumber()
  principalRepayment?: number;

  @Field({ nullable: true })
  @IsNumber()
  interestAmount?: number;

  @Field({ nullable: true })
  @IsNumber()
  outstandingBalance?: number;

  @Field({ nullable: true })
  @IsNumber()
  year?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  currency?: string;
}