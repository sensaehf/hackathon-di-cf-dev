import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreatePensionsGrantsSubsidyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
