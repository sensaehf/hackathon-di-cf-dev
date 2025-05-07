import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateVehicleInput {
  @Field(() => String)
  @IsString()
  id!: string;

  @Field(() => Int)
  @IsNumber()
  taxSubmissionId!: number;

  @Field(() => Int)
  @IsNumber()
  purchaseYear!: number;

  @Field(() => Float)
  @IsNumber()
  purchasePrice!: number;

  @Field(() => String)
  @IsString()
  currency!: string;

}