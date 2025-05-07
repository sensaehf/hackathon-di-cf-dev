import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreatePerDiemAndPerkInput {
  @Field(() => Int)
  @IsNumber()
  taxSubmissionId!: number;

  @Field(() => String)
  @IsString()
  type!: string;

  @Field(() => Float)
  @IsNumber()
  amount!: number;

  @Field(() => String)
  @IsString()
  currency!: string;

  @Field(() => String)
  @IsString()
  description!: string;
}