import { ApiProperty } from "@nestjs/swagger";
import { Vehicle } from "../vehicle.model";

export class VehicleViewModel {
    constructor(vehicle : Vehicle){
        this.id = vehicle.id
        this.taxSubmissionId = vehicle.taxSubmissionId
        this.purchasePrice = vehicle.purchasePrice
        this.currency = vehicle.currency
        this.purchaseYear = vehicle.purchaseYear
    }

    @ApiProperty()
    id: string;
    @ApiProperty()
    taxSubmissionId: number;
    @ApiProperty()
    purchasePrice: number;
    @ApiProperty()
    currency: string;
    @ApiProperty()
    purchaseYear: number;
}