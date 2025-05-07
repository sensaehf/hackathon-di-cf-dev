import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PerDiemAndPerks {
  @Field(() => ID)
  id!: number;

  @Field({ nullable: true })
  taxSubmissionId?: number;

  @Field(() => String, { nullable: true })
  type?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field(() => String, { nullable: true })
  currency?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}