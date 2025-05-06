import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class PensionsGrantsSubsidies {
  @Field(() => ID)
  id!: number;

  @Field()
  taxSubmissionId?: number;

  @Field()
  sourceName?: string;

  @Field()
  grantType?: string;

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