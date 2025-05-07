import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateOtherReliabilityInput {
  @Field((_) => Int)
  @IsNumber()
  taxSubmissionId!: number;

  @Field((_) => String)
  @IsString()
  description!: string;

  @Field((_) => Float)
  @IsNumber()
  interestAmount!: number;

  @Field((_) => Float)
  @IsNumber()
  balance!: number;

  @Field((_) => Int)
  @IsNumber()
  year!: number;

  @Field((_) => String)
  @IsString()
  currency!: string;
}