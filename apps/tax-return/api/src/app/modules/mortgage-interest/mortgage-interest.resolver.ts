import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { MortgageInterest } from './entities/mortgage-interest.entity'
import { CreateMortgageInterestInput } from './dto/create-mortgage-interest.input'
import { UpdateMortgageInterestInput } from './dto/update-mortgage-interest.input'

@Resolver(() => MortgageInterest)
export class MortgageInterestResolver {

  @Mutation(() => MortgageInterest)
  createMortgageInterest(
    @Args('createMortgageInterestInput')
    createMortgageInterestInput: CreateMortgageInterestInput,
  ) {
    return this.mortgageInterestService.create(createMortgageInterestInput)
  }

  @Query(() => [MortgageInterest], { name: 'mortgageInterest' })
  findAll() {
    return this.mortgageInterestService.findAll()
  }

  @Query(() => MortgageInterest, { name: 'mortgageInterest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mortgageInterestService.findOne(id)
  }

  @Mutation(() => MortgageInterest)
  updateMortgageInterest(
    @Args('updateMortgageInterestInput')
    updateMortgageInterestInput: UpdateMortgageInterestInput,
  ) {
    return this.mortgageInterestService.update(
      updateMortgageInterestInput.id,
      updateMortgageInterestInput,
    )
  }

  @Mutation(() => MortgageInterest)
  removeMortgageInterest(@Args('id', { type: () => Int }) id: number) {
    return this.mortgageInterestService.remove(id)
  }
}
