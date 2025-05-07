import { Resolver, Query, Args, Int, Context, Mutation } from '@nestjs/graphql';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { BackendAPI } from '../../../services';
import { UpdateVehicleInput } from './dto/update-vehicle.input';

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

  @Mutation(() => Vehicle, { name: 'updateVehicle' })
  async updateVehicle(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('updateVehicleInput') updateVehicleInput: UpdateVehicleInput,
  ): Promise<Vehicle> {
    return await backendApi.updateVehicle(updateVehicleInput);
  }

  @Mutation(() => Int, { name: 'deleteVehicle' })
  async deleteVehicle(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
    @Args('id', { type: () => String }) id: string,
    @Args('taxSubmissionId', { type: () => Int }) taxSubmissionId: number,
  ): Promise<number> {
    return await backendApi.deleteVehicle(id, taxSubmissionId);
  }
}