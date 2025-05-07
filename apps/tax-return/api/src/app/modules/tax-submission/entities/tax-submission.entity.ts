import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class TaxSubmission {
  @Field(() => ID)
  id!: number

  @Field()
  personId!: number

  @Field({ nullable: true })
  taxYear?: number

  @Field(() => String, { nullable: true })
  createdAt?: string

  @Field(() => String, { nullable: true })
  submittedAt?: string

  @Field(() => String, { nullable: true })
  modified?: string
}