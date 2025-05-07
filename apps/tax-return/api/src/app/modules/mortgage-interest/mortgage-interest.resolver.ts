import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { MortgageInterest } from './entities/mortgage-interest.entity';
import { CreateMortgageInterestInput } from './dto/create-mortgage-interest.input';
import { BackendAPI } from '../../../services';

@Resolver(() => MortgageInterest)
export class MortgageInterestResolver {
  @Query(() => [MortgageInterest], { name: 'findAllMortgageInterestsByTaxSubmission' })
  async findAllMortgageInterestsByTaxSubmission(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<MortgageInterest[]> {
    return await backendApi.getAllMortgageInterestsByTaxSubmission(taxSubmissionId);
  }

  @Mutation(() => MortgageInterest, { name: 'createMortgageInterest' })
  async createMortgageInterest(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('createMortgageInterestInput') createMortgageInterestInput: CreateMortgageInterestInput,
  ): Promise<MortgageInterest> {
    return await backendApi.createMortgageInterest(createMortgageInterestInput);
  }
}