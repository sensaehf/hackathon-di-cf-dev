import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { OtherReliabilities } from './entities/other-reliability.entity';
import { CreateOtherReliabilityInput } from './dto/create-other-reliability.input';
import { BackendAPI } from '../../../services';
import { logger } from '@island.is/logging';

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
}