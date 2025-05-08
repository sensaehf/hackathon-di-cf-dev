import { IsString } from 'class-validator'
import { CreateRealEstateInput } from './create-real-estate.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateRealEstateInput extends PartialType(CreateRealEstateInput) {
  @Field(() => String)
  @IsString()
  id!: string
}
