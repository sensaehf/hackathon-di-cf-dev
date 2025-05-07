import { CreatePerDiemAndPerkInput } from './create-per-diem-and-perk.input'
import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePerDiemAndPerkInput extends PartialType(
  CreatePerDiemAndPerkInput,
) {
  @Field(() => Int)
  id!: number
}
