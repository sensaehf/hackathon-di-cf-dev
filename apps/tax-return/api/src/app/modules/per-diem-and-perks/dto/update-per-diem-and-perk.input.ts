import { IsString } from 'class-validator'
import { CreatePerDiemAndPerkInput } from './create-per-diem-and-perk.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePerDiemAndPerkInput extends PartialType(
  CreatePerDiemAndPerkInput,
) {
  @Field(() => String)
  @IsString()
  id!: string
}
