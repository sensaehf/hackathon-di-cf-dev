import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { RealEstate } from './entities/real-estate.entity';
import { CreateRealEstateInput } from './dto/create-real-estate.input';
import { BackendAPI } from '../../../services';

@Resolver(() => RealEstate)
export class RealEstateResolver {
  @Query(() => [RealEstate], { name: 'findAllRealEstatesByTaxSubmission' })
  async findAllRealEstatesByTaxSubmission(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<RealEstate[]> {
    return await backendApi.getAllRealEstatesByTaxSubmission(taxSubmissionId);
  }

  @Mutation(() => RealEstate, { name: 'createRealEstate' })
  async createRealEstate(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('createRealEstateInput') createRealEstateInput: CreateRealEstateInput,
  ): Promise<RealEstate> {
    return await backendApi.createRealEstate(createRealEstateInput);
  }
}