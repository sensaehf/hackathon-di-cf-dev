import { ObjectType, Field} from '@nestjs/graphql'

@ObjectType()
export class Person {
  @Field(() => String, { description: 'Name' })
  name!: string
  @Field(() => String, { description: 'National ID, format ######-####' })
  nationalId!: string
  @Field(() => String, { description: 'Address' })
  address!: string
  @Field(() => String, { description: 'Email' })
  email!: string
  @Field(() => String, { description: 'Phone number, format ###-####' })
  phoneNumber!: string

}
