import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ObjectType()
export class PensionsGrantsSubsidies {
  @Field(() => ID)
  @IsNumber()
  id!: number;

  @Field()
  @IsNumber()
  taxSubmissionId?: number;

  @Field()
  @IsString()
  sourceName?: string;

  @Field()
  @IsString()
  grantType?: string;

  @Field()
  @IsNumber()
  amount?: number;

  @Field()
  @IsString()
  currency?: string;

  @Field()
  @IsString()
  description?: string;

  @Field()
  @IsNumber()
  year?: number;

}