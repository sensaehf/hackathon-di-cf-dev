import { CreateConsentInput } from './create-consent.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateConsentInput extends PartialType(CreateConsentInput) {
  @Field(() => Int, { description: 'Id' })
  id!: number

  @Field(() => String, { description: 'National Id' })
  nationalId!: string

  @Field(() => Boolean, { description: 'Consent' })
  consent!: boolean
}
