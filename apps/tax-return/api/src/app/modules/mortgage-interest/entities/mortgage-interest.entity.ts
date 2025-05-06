import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class MortgageInterest {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
