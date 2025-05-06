import { CreateRealEstateInput } from './create-real-estate.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateRealEstateInput extends PartialType(CreateRealEstateInput) {
  @Field(() => Int)
  id: number
}
