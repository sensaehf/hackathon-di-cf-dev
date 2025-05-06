import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { PensionsGrantsSubsidy } from './entities/pensions-grants-subsidy.entity'
import { CreatePensionsGrantsSubsidyInput } from './dto/create-pensions-grants-subsidy.input'
import { UpdatePensionsGrantsSubsidyInput } from './dto/update-pensions-grants-subsidy.input'

@Resolver(() => PensionsGrantsSubsidy)
export class PensionsGrantsSubsidiesResolver {

  @Mutation(() => PensionsGrantsSubsidy)
  createPensionsGrantsSubsidy(
    @Args('createPensionsGrantsSubsidyInput')
    createPensionsGrantsSubsidyInput: CreatePensionsGrantsSubsidyInput,
  ) {
    return this.pensionsGrantsSubsidiesService.create(
      createPensionsGrantsSubsidyInput,
    )
  }

  @Query(() => [PensionsGrantsSubsidy], { name: 'pensionsGrantsSubsidies' })
  findAll() {
    return this.pensionsGrantsSubsidiesService.findAll()
  }

  @Query(() => PensionsGrantsSubsidy, { name: 'pensionsGrantsSubsidy' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.pensionsGrantsSubsidiesService.findOne(id)
  }

  @Mutation(() => PensionsGrantsSubsidy)
  updatePensionsGrantsSubsidy(
    @Args('updatePensionsGrantsSubsidyInput')
    updatePensionsGrantsSubsidyInput: UpdatePensionsGrantsSubsidyInput,
  ) {
    return this.pensionsGrantsSubsidiesService.update(
      updatePensionsGrantsSubsidyInput.id,
      updatePensionsGrantsSubsidyInput,
    )
  }

  @Mutation(() => PensionsGrantsSubsidy)
  removePensionsGrantsSubsidy(@Args('id', { type: () => Int }) id: number) {
    return this.pensionsGrantsSubsidiesService.remove(id)
  }
}
