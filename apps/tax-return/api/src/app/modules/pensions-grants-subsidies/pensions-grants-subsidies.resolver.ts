import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { PensionsGrantsSubsidies } from './entities/pensions-grants-subsidy.entity';
import { CreatePensionsGrantsSubsidyInput } from './dto/create-pensions-grants-subsidy.input';
import { BackendAPI } from '../../../services';
import { UpdatePensionsGrantsSubsidyInput } from './dto/update-pensions-grants-subsidy.input';

@Resolver(() => PensionsGrantsSubsidies)
export class PensionsGrantsSubsidiesResolver {
  @Query(() => [PensionsGrantsSubsidies], { name: 'findAllPensionsGrantsSubsidiesByTaxSubmission' })
  async findAllPensionsGrantsSubsidiesByTaxSubmission(
    @Context('dataSources') { backendApi } : { backendApi: BackendAPI },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<PensionsGrantsSubsidies[]> {
    return await backendApi.getAllPensionsGrantsSubsidiesByTaxSubmission(taxSubmissionId);
  }

  @Mutation(() => PensionsGrantsSubsidies, { name: 'createPensionsGrantsSubsidy' })
  async createPensionsGrantsSubsidy(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('createPensionsGrantsSubsidyInput') createPensionsGrantsSubsidyInput: CreatePensionsGrantsSubsidyInput,
  ): Promise<PensionsGrantsSubsidies> {
    return await backendApi.createPensionsGrantsSubsidy(createPensionsGrantsSubsidyInput);
  }

  @Mutation(() => PensionsGrantsSubsidies, { name: 'updatePensionsGrantsSubsidy' })
  async updatePensionsGrantsSubsidy(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('updatePensionsGrantsSubsidyInput') updatePensionsGrantsSubsidyInput: UpdatePensionsGrantsSubsidyInput,
  ): Promise<PensionsGrantsSubsidies> {
    return await backendApi.updatePensionsGrantsSubsidy(updatePensionsGrantsSubsidyInput);
  }

  @Mutation(() => String, { name: 'deletePensionsGrantsSubsidy' })
  async deletePensionsGrantsSubsidy(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('id', { type: () => Int }) id: number,
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<string> {
    return await backendApi.deletePensionsGrantsSubsidy(id, taxSubmissionId);
  }
}