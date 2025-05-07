import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id!: string;

  @Field()
  taxSubmissionId?: number;

  @Field()
  purchaseYear?: number;

  @Field()
  purchasePrice?: number;

  @Field()
  currency?: string;
}