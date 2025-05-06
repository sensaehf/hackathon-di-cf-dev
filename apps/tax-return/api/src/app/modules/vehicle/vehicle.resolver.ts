import { Resolver, Query, Args, Int, Context } from '@nestjs/graphql';
import { Vehicle } from './entities/vehicle.entity';

@Resolver(() => Vehicle)
export class VehicleResolver {
  @Query(() => [Vehicle], { name: 'findAllVehiclesByTaxSubmission' })
  async findAllVehiclesByTaxSubmission(
    @Context('dataSources') { backendApi },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<Vehicle[]> {
    return await backendApi.getAllVehiclesByTaxSubmission(taxSubmissionId);
  }
}