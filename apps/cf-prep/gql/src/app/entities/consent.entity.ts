import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Consent {
  @Field(() => Int, { description: 'Id' })
  id!: number

  @Field(() => String, { description: 'National Id' })
  nationalId!: string

  @Field(() => String, { description: 'Created' })
  created!: string

  @Field(() => String, { description: 'Modified' })
  modified!: string

  @Field(() => Boolean, { description: 'Consent' })
  consent!: boolean


}
