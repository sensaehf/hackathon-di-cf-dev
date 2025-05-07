import { IsInt } from 'class-validator'
import { CreateOtherReliabilityInput } from './create-other-reliability.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateOtherReliabilityInput extends PartialType(
  CreateOtherReliabilityInput,
) {
  @Field(() => Int)
  @IsInt()
  id!: number
}
