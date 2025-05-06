import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateTaxSubmissionInput {

  @Field(() => Int, { description: 'Identifier for the associated person' })
  personId!: number

  @Field(() => Int, { description: 'Tax year for the submission' })
  taxYear?: number
}
