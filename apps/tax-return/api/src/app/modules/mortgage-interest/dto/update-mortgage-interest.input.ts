import { IsString } from 'class-validator'
import { CreateMortgageInterestInput } from './create-mortgage-interest.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateMortgageInterestInput extends PartialType(
  CreateMortgageInterestInput,
) {
  @Field(() => String)
  @IsString()
  id!: string
}
