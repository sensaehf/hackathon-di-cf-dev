import { CreateTaxSubmissionInput } from './create-tax-submission.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateTaxSubmissionInput extends PartialType(
  CreateTaxSubmissionInput,
) {
  @Field(() => Int, { description: 'Unique identifier for the tax submission' })
  id!: number

  @Field(() => Int, { description: 'Identifier for the associated person' })
  personId!: number

  @Field(() => Int, { description: 'Tax year for the submission' })
  taxYear?: number
}
