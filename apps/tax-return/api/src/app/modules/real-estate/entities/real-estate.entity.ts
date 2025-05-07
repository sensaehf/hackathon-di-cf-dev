import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class RealEstate {
  @Field(() => ID)
  @IsString()
  id!: string;

  @Field()
  taxSubmissionId?: number;

  @Field()
  address?: string;

  @Field()
  assessedValue?: number;

  @Field()
  currency?: string;
}