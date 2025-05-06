import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class PerDiemAndPerk {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
