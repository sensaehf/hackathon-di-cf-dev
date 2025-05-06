import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class RealEstate {
  @Field(() => ID)
  id!: string;

  @Field()
  taxSubmissionId?: number;

  @Field()
  address?: string;

  @Field()
  assessedValue?: number;

  @Field()
  currency?: string;

  @Field()
  year?: number;
}