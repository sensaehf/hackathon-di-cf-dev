import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class RealEstate {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
