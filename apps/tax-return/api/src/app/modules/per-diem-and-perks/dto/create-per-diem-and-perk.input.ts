import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreatePerDiemAndPerkInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number
}
