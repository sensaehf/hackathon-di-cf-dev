import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class OtherReliability {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
