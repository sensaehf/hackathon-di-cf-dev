import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { TaxSubmission } from './entities/tax-submission.entity'
import { CreateTaxSubmissionInput } from './dto/create-tax-submission.input'
import { UpdateTaxSubmissionInput } from './dto/update-tax-submission.input'

@Resolver(() => TaxSubmission)
export class TaxSubmissionResolver {
  @Mutation(() => TaxSubmission, { nullable: true })
  async createTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('createTaxSubmissionInput') input: CreateTaxSubmissionInput,
  ): Promise<TaxSubmission> {
    console.log('createTaxSubmission', input)
    return await backendApi.createTaxSubmission(input)
  }

  @Query(() => [TaxSubmission], { name: 'findAllTaxSubmissionsForUser' })
  async findAllTaxSubmissionsForUser(
    @Context('dataSources') { backendApi },
    @Args('personId', { type: () => Int }) personId: number,
  ): Promise<TaxSubmission[]> {
    return await backendApi.getAllTaxSubmissionsForUser(personId)
  }

  @Query(() => TaxSubmission, { name: 'findOneTaxSubmission' })
  async findOneTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TaxSubmission> {
    return await backendApi.getTaxSubmissionById(id)
  }

  @Mutation(() => TaxSubmission, { nullable: true })
  async updateTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('updateTaxSubmissionInput') input: UpdateTaxSubmissionInput,
  ): Promise<TaxSubmission> {
    return await backendApi.updateTaxSubmission(input.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  async removeTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await backendApi.deleteTaxSubmission(id)
    return true
  }
}