import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { RealEstate } from './entities/real-estate.entity'
import { CreateRealEstateInput } from './dto/create-real-estate.input'
import { UpdateRealEstateInput } from './dto/update-real-estate.input'

@Resolver(() => RealEstate)
export class RealEstateResolver {

  @Mutation(() => RealEstate)
  createRealEstate(
    @Args('createRealEstateInput') createRealEstateInput: CreateRealEstateInput,
  ) {
    return this.realEstateService.create(createRealEstateInput)
  }

  @Query(() => [RealEstate], { name: 'realEstate' })
  findAll() {
    return this.realEstateService.findAll()
  }

  @Query(() => RealEstate, { name: 'realEstate' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.realEstateService.findOne(id)
  }

  @Mutation(() => RealEstate)
  updateRealEstate(
    @Args('updateRealEstateInput') updateRealEstateInput: UpdateRealEstateInput,
  ) {
    return this.realEstateService.update(
      updateRealEstateInput.id,
      updateRealEstateInput,
    )
  }

  @Mutation(() => RealEstate)
  removeRealEstate(@Args('id', { type: () => Int }) id: number) {
    return this.realEstateService.remove(id)
  }
}
