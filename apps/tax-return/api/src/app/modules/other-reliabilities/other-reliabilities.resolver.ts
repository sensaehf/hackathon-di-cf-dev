import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { OtherReliability } from './entities/other-reliability.entity'
import { CreateOtherReliabilityInput } from './dto/create-other-reliability.input'
import { UpdateOtherReliabilityInput } from './dto/update-other-reliability.input'

@Resolver(() => OtherReliability)
export class OtherReliabilitiesResolver {

  @Mutation(() => OtherReliability)
  createOtherReliability(
    @Args('createOtherReliabilityInput')
    createOtherReliabilityInput: CreateOtherReliabilityInput,
  ) {
    return this.otherReliabilitiesService.create(createOtherReliabilityInput)
  }

  @Query(() => [OtherReliability], { name: 'otherReliabilities' })
  findAll() {
    return this.otherReliabilitiesService.findAll()
  }

  @Query(() => OtherReliability, { name: 'otherReliability' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.otherReliabilitiesService.findOne(id)
  }

  @Mutation(() => OtherReliability)
  updateOtherReliability(
    @Args('updateOtherReliabilityInput')
    updateOtherReliabilityInput: UpdateOtherReliabilityInput,
  ) {
    return this.otherReliabilitiesService.update(
      updateOtherReliabilityInput.id,
      updateOtherReliabilityInput,
    )
  }

  @Mutation(() => OtherReliability)
  removeOtherReliability(@Args('id', { type: () => Int }) id: number) {
    return this.otherReliabilitiesService.remove(id)
  }
}
