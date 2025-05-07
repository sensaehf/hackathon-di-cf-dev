import { CreateVehicleInput } from './create-vehicle.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {}
