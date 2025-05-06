import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { PerDiemAndPerks } from './entities/per-diem-and-perk.entity';

@Resolver(() => PerDiemAndPerks)
export class PerDiemAndPerksResolver {
  @Query(() => [PerDiemAndPerks], { name: 'findAllPerDiemAndPerksByTaxSubmission' })
  async findAllPerDiemAndPerksByTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<PerDiemAndPerks[]> {
    return await backendApi.getAllPerDiemAndPerksByTaxSubmission(taxSubmissionId);
  }
}