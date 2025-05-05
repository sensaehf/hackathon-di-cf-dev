import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateConsentInput {
  @Field(() => Int, { description: 'Id' })
  id!: number

  @Field(() => String, { description: 'National Id' })
  nationalId!: string

  @Field(() => Boolean, { description: 'Consent' })
  consent!: boolean
}
