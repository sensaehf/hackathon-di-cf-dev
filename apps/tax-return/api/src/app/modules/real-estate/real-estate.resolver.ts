import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { RealEstate } from './entities/real-estate.entity';

@Resolver(() => RealEstate)
export class RealEstateResolver {
  @Query(() => [RealEstate], { name: 'findAllRealEstatesByTaxSubmission' })
  async findAllRealEstatesByTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<RealEstate[]> {
    return await backendApi.getAllRealEstatesByTaxSubmission(taxSubmissionId);
  }
}