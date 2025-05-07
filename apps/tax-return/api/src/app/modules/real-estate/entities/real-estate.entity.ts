import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class RealEstate {
  @Field(() => ID)
  @IsString()
  id!: string;

  @Field({ nullable: true })
  taxSubmissionId?: number;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field({ nullable: true })
  assessedValue?: number;

  @Field(() => String, { nullable: true })
  currency?: string;
}