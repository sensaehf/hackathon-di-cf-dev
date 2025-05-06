import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class SalaryWorkPayment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
