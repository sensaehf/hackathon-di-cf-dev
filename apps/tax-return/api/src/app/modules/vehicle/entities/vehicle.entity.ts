import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id!: string;

  @Field({ nullable: true })
  taxSubmissionId?: number;

  @Field({ nullable: true })
  purchaseYear?: number;

  @Field({ nullable: true })
  purchasePrice?: number;

  @Field(() => String, { nullable: true })
  currency?: string;
}