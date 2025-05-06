import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PerDiemAndPerks {
  @Field(() => ID)
  id!: number;

  @Field()
  taxSubmissionId?: number;

  @Field()
  type?: string;

  @Field()
  amount?: number;

  @Field()
  currency?: string;

  @Field()
  description?: string;
}