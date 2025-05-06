import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { PensionsGrantsSubsidies } from './entities/pensions-grants-subsidy.entity';

@Resolver(() => PensionsGrantsSubsidies)
export class PensionsGrantsSubsidiesResolver {
  @Query(() => [PensionsGrantsSubsidies], { name: 'findAllPensionsGrantsSubsidiesByTaxSubmission' })
  async findAllPensionsGrantsSubsidiesByTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<PensionsGrantsSubsidies[]> {
    return await backendApi.getAllPensionsGrantsSubsidiesByTaxSubmission(taxSubmissionId);
  }
}