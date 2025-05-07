import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SalaryWorkPayments {
  @Field(() => ID)
  id!: number;

  @Field({ nullable: true })
  taxSubmissionId?: number;

  @Field(() => String, { nullable: true })
  employerName?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  currency?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field({ nullable: true })
  year?: number;
}