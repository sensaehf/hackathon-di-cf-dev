import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class TaxSubmission {
  @Field(() => Int, { description: 'Unique identifier for the tax submission' })
  id!: number

  @Field(() => Int, { description: 'Identifier for the associated person' })
  personId!: number

  @Field(() => Int, { description: 'Tax year for the submission' })
  taxYear?: number

  @Field(() => Date, { description: 'Timestamp when the submission was created' })
  createdAt?: Date

  @Field(() => Date, { description: 'Timestamp when the submission was created' })
  submittedAt?: Date
}