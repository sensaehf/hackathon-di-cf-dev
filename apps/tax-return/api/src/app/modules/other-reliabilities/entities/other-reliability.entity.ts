import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OtherReliabilities {
  @Field(() => ID)
  id!: number;

  @Field({ nullable: true })
  taxSubmissionId?: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field({ nullable: true })
  interestAmount?: number;

  @Field({ nullable: true })
  balance?: number;

  @Field({ nullable: true })
  year?: number;

  @Field(() => String, { nullable: true })
  currency?: string;
}