import { ApiProperty } from "@nestjs/swagger";
import { VehicleViewModel } from "./vehicleViewModel.dto";

export class VehicleResponse {
    constructor(vehicles : VehicleViewModel[]){
        this.vehicles = vehicles
    }

    @ApiProperty()
    vehicles: VehicleViewModel[];
}