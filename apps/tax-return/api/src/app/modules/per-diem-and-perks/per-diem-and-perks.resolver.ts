import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { PerDiemAndPerks } from './entities/per-diem-and-perk.entity';
import { CreatePerDiemAndPerkInput } from './dto/create-per-diem-and-perk.input';
import { BackendAPI } from '../../../services';
import { UpdatePerDiemAndPerkInput } from './dto/update-per-diem-and-perk.input';

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

  @Mutation(() => PerDiemAndPerks, { name: 'updatePerDiemAndPerk' })
  async updatePerDiemAndPerk(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('updatePerDiemAndPerkInput') updatePerDiemAndPerkInput: UpdatePerDiemAndPerkInput,
  ): Promise<PerDiemAndPerks> {
    return await backendApi.updatePerDiemAndPerk(updatePerDiemAndPerkInput);
  }

  @Mutation(() => Int, { name: 'deletePerDiemAndPerk' })
  async deletePerDiemAndPerk(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('id', { type: () => String }) id: string,
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<number> {
    return await backendApi.deletePerDiemAndPerk(id, taxSubmissionId);
  }
}