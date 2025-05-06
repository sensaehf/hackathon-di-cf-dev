import { CreatePensionsGrantsSubsidyInput } from './create-pensions-grants-subsidy.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePensionsGrantsSubsidyInput extends PartialType(
  CreatePensionsGrantsSubsidyInput,
) {
  @Field(() => Int)
  id: number
}
