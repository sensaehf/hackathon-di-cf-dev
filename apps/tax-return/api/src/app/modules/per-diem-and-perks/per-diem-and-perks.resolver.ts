import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { PerDiemAndPerks } from './entities/per-diem-and-perk.entity';
import { CreatePerDiemAndPerkInput } from './dto/create-per-diem-and-perk.input';
import { BackendAPI } from '../../../services';

@Resolver(() => PerDiemAndPerks)
export class PerDiemAndPerksResolver {
  @Query(() => [PerDiemAndPerks], { name: 'findAllPerDiemAndPerksByTaxSubmission' })
  async findAllPerDiemAndPerksByTaxSubmission(
    @Context('dataSources') { backendApi } : { backendApi: BackendAPI },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<PerDiemAndPerks[]> {
    return await backendApi.getAllPerDiemAndPerksByTaxSubmission(taxSubmissionId);
  }

  @Mutation(() => PerDiemAndPerks, { name: 'createPerDiemAndPerk' })
  async createPerDiemAndPerk(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('createPerDiemAndPerkInput') createPerDiemAndPerkInput: CreatePerDiemAndPerkInput,
  ): Promise<PerDiemAndPerks> {
    return await backendApi.createPerDiemAndPerk(createPerDiemAndPerkInput);
  }
}