import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { MortgageInterest } from './entities/mortgage-interest.entity';

@Resolver(() => MortgageInterest)
export class MortgageInterestResolver {
  @Query(() => [MortgageInterest], { name: 'findAllMortgageInterestsByTaxSubmission' })
  async findAllMortgageInterestsByTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<MortgageInterest[]> {
    return await backendApi.getAllMortgageInterestsByTaxSubmission(taxSubmissionId);
  }
}