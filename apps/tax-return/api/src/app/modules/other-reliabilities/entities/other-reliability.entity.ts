import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OtherReliabilities {
  @Field(() => ID)
  id!: number;

  @Field()
  taxSubmissionId?: number;

  @Field()
  description?: string;

  @Field()
  interestAmount?: number;

  @Field()
  balance?: number;

  @Field()
  year?: number;

  @Field()
  currency?: string;
}