import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class PensionsGrantsSubsidies {
  @Field(() => ID)
  @IsNumber()
  id!: number;

  @Field({ nullable: true })
  @IsNumber()
  taxSubmissionId?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  sourceName?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  grantType?: string;

  @Field({ nullable: true })
  @IsNumber()
  amount?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  currency?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsNumber()
  year?: number;

}