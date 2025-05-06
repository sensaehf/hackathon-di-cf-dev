import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SalaryWorkPayments {
  @Field(() => ID)
  id!: number;

  @Field()
  taxSubmissionId?: number;

  @Field()
  employerName?: string;

  @Field()
  amount?: number;

  @Field()
  currency?: string;

  @Field()
  description?: string;

  @Field()
  year?: number;

  @Field()
  modified?: string;
}