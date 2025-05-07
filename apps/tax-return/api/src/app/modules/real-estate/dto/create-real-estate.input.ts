import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateRealEstateInput {
  
  @Field(() => String)
  @IsString()
  id!: string;

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
}