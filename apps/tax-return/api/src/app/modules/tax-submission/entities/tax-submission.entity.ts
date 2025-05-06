import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class TaxSubmission {
  @Field(() => ID)
  id!: number

  @Field()
  personId!: number

  @Field()
  taxYear?: number

  @Field()
  createdAt?: string

  @Field()
  submittedAt?: string

  @Field()
  modified?: string
}