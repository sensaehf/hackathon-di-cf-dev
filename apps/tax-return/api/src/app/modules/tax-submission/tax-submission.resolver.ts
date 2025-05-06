import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { TaxSubmission } from './entities/tax-submission.entity'
import { CreateTaxSubmissionInput } from './dto/create-tax-submission.input'
import { UpdateTaxSubmissionInput } from './dto/update-tax-submission.input'

@Resolver(() => TaxSubmission)
export class TaxSubmissionResolver {
  @Mutation(() => TaxSubmission, { nullable: true })
  async createTaxSubmissionNew(
    @Context('dataSources') { backendApi },
    @Args('createTaxSubmissionInput') input: CreateTaxSubmissionInput,
  ): Promise<TaxSubmission> {
    return await backendApi.createTaxSubmission(input)
  }

  @Query(() => [TaxSubmission], { name: 'findAllTaxSubmissionsNew' })
  async findAllTaxSubmissionsNew(
    @Context('dataSources') { backendApi },
  ): Promise<TaxSubmission[]> {
    return await backendApi.getAllTaxSubmissions()
  }

  @Query(() => TaxSubmission, { name: 'findOneTaxSubmissionNew' })
  async findOneTaxSubmissionNew(
    @Context('dataSources') { backendApi },
    @Args('id', { type: () => Int }) id: number,
  ): Promise<TaxSubmission> {
    return await backendApi.getTaxSubmissionById(id)
  }

  @Mutation(() => TaxSubmission, { nullable: true })
  async updateTaxSubmissionNew(
    @Context('dataSources') { backendApi },
    @Args('updateTaxSubmissionInput') input: UpdateTaxSubmissionInput,
  ): Promise<TaxSubmission> {
    return await backendApi.updateTaxSubmission(input.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  async removeTaxSubmissionNew(
    @Context('dataSources') { backendApi },
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await backendApi.deleteTaxSubmission(id)
    return true
  }
}