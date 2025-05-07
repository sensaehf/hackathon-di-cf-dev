import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRealEstateInput {
  @Field(() => Int)
  @IsNumber()
  taxSubmissionId!: number;

  @Field(() => String)
  @IsString()
  address!: string;

  @Field(() => Float)
  @IsNumber()
  assessedValue!: number;

  @Field(() => String)
  @IsString()
  currency!: string;

  @Field(() => Int)
  @IsNumber()
  year!: number;
}