import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateMortgageInterestInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
