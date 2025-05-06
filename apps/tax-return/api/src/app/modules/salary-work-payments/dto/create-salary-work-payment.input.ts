import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateSalaryWorkPaymentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
