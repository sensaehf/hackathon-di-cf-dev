import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { BackendAPI } from '../../../services';

@Resolver(() => Vehicle)
export class VehicleResolver {
  @Query(() => [Vehicle], { name: 'findAllVehiclesByTaxSubmission' })
  async findAllVehiclesByTaxSubmission(
    @Context('dataSources') { backendApi } : { backendApi: BackendAPI },
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<Vehicle[]> {
    return await backendApi.getAllVehiclesByTaxSubmission(taxSubmissionId);
  }

  @Mutation(() => Vehicle, { name: 'createVehicle' })
  async createVehicle(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('createVehicleInput') createVehicleInput: CreateVehicleInput,
  ): Promise<Vehicle> {
    return await backendApi.createVehicle(createVehicleInput);
  }
}