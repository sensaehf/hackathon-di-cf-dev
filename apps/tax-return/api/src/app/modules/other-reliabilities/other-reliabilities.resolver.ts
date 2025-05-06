import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { OtherReliabilities } from './entities/other-reliability.entity';

@Resolver(() => OtherReliabilities)
export class OtherReliabilitiesResolver {
  @Query(() => [OtherReliabilities], { name: 'findAllOtherReliabilitiesByTaxSubmission' })
  async findAllOtherReliabilitiesByTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<OtherReliabilities[]> {
    return await backendApi.getAllOtherReliabilitiesByTaxSubmission(taxSubmissionId);
  }
}