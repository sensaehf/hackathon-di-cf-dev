import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { PerDiemAndPerk } from './entities/per-diem-and-perk.entity'
import { CreatePerDiemAndPerkInput } from './dto/create-per-diem-and-perk.input'
import { UpdatePerDiemAndPerkInput } from './dto/update-per-diem-and-perk.input'

@Resolver(() => PerDiemAndPerk)
export class PerDiemAndPerksResolver {

  @Mutation(() => PerDiemAndPerk)
  createPerDiemAndPerk(
    @Args('createPerDiemAndPerkInput')
    createPerDiemAndPerkInput: CreatePerDiemAndPerkInput,
  ) {
    return this.perDiemAndPerksService.create(createPerDiemAndPerkInput)
  }

  @Query(() => [PerDiemAndPerk], { name: 'perDiemAndPerks' })
  findAll() {
    return this.perDiemAndPerksService.findAll()
  }

  @Query(() => PerDiemAndPerk, { name: 'perDiemAndPerk' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.perDiemAndPerksService.findOne(id)
  }

  @Mutation(() => PerDiemAndPerk)
  updatePerDiemAndPerk(
    @Args('updatePerDiemAndPerkInput')
    updatePerDiemAndPerkInput: UpdatePerDiemAndPerkInput,
  ) {
    return this.perDiemAndPerksService.update(
      updatePerDiemAndPerkInput.id,
      updatePerDiemAndPerkInput,
    )
  }

  @Mutation(() => PerDiemAndPerk)
  removePerDiemAndPerk(@Args('id', { type: () => Int }) id: number) {
    return this.perDiemAndPerksService.remove(id)
  }
}
