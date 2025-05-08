import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { RealEstate } from './entities/real-estate.entity';
import { CreateRealEstateInput } from './dto/create-real-estate.input';
import { BackendAPI } from '../../../services';
import { UpdateRealEstateInput } from './dto/update-real-estate.input';

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

  @Mutation(() => RealEstate, { name: 'updateRealEstate' })
  async updateRealEstate(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('updateRealEstateInput') updateRealEstateInput: UpdateRealEstateInput,
  ): Promise<RealEstate> {
    return await backendApi.updateRealEstate(updateRealEstateInput);
  }

  @Mutation(() => String, { name: 'deleteRealEstate' })
  async deleteRealEstate(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('id', { type: () => String }) id: string,
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<string> {
    return await backendApi.deleteRealEstate(id, taxSubmissionId);
  }
}