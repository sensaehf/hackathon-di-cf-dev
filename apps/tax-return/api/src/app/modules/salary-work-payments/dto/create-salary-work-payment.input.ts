import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateSalaryWorkPaymentInput {
  @Field(() => Int)
  @IsNumber()
  taxSubmissionId!: number;

  @Field(() => String)
  @IsString()
  employerName!: string;

  @Field(() => Float)
  @IsNumber()
  amount!: number;

  @Field(() => String)
  @IsString()
  currency!: string;

  @Field(() => String)
  @IsString()
  description!: string;

  @Field(() => Int)
  @IsNumber()
  year!: number;
}