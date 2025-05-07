import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { OtherReliabilities } from './entities/other-reliability.entity';
import { CreateOtherReliabilityInput } from './dto/create-other-reliability.input';
import { BackendAPI } from '../../../services';
import { UpdateOtherReliabilityInput } from './dto/update-other-reliability.input';

@Resolver(() => OtherReliabilities)
export class OtherReliabilitiesResolver {

  @Query(() => [OtherReliabilities], { name: 'findAllOtherReliabilitiesByTaxSubmission' })
  async findAllOtherReliabilitiesByTaxSubmission(
    @Context('dataSources') { backendApi } : {backendApi: BackendAPI},
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<OtherReliabilities[]> {
    return await backendApi.getAllOtherReliabilitiesByTaxSubmission(taxSubmissionId);
  }

  @Mutation(() => OtherReliabilities, { name: 'createOtherReliability' })
  async createOtherReliability(
    @Context('dataSources') { backendApi } : {backendApi: BackendAPI},
    @Args('createReliabilityInput') createReliabilityInput: CreateOtherReliabilityInput,
  ): Promise<OtherReliabilities> {
    return await backendApi.createOtherReliability(createReliabilityInput);
  }

  @Mutation(() => OtherReliabilities, { name: 'updateOtherReliability' })
  async updateOtherReliability(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('updateReliabilityInput') updateReliabilityInput: UpdateOtherReliabilityInput,
  ): Promise<OtherReliabilities> {
    return await backendApi.updateOtherReliability(updateReliabilityInput);
  }

  @Mutation(() => Boolean, { name: 'deleteOtherReliability' })
  async deleteOtherReliability(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('id', { type: () => Int }) id: number,
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<boolean> {
    return await backendApi.deleteOtherReliability(id, taxSubmissionId);
  }
}