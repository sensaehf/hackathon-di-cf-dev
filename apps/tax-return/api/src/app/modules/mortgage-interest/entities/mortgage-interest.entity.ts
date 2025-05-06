import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class MortgageInterest {
  @Field(() => ID)
  id!: string;

  @Field()
  taxSubmissionId?: number;

  @Field()
  lenderName?: string;

  @Field()
  type?: string;

  @Field()
  description?: string;

  @Field()
  startDate?: string;

  @Field()
  termYears?: number;

  @Field()
  purchaseYear?: number;

  @Field()
  totalAnnualPayments?: number;

  @Field()
  principalRepayment?: number;

  @Field()
  interestAmount?: number;

  @Field()
  outstandingBalance?: number;

  @Field()
  year?: number;

  @Field()
  currency?: string;
}