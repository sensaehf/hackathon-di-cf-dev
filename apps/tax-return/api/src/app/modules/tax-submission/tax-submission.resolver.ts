import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql'
import { TaxSubmission } from './entities/tax-submission.entity'
import { BackendAPI } from '../../../services'

@Resolver(() => TaxSubmission)
export class TaxSubmissionResolver {

  @Query(() => [TaxSubmission], { name: 'findAllTaxSubmissionsForUser' })
  async findAllTaxSubmissionsForUser(
    @Context('dataSources') { backendApi } : { backendApi: BackendAPI },
    @Args('personId', { type: () => Int }) personId: number,
  ): Promise<TaxSubmission[]> {
    return await backendApi.getAllTaxSubmissionsForUser(personId)
  }
}