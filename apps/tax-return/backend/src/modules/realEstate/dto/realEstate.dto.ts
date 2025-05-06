import { ApiProperty } from "@nestjs/swagger";
import { RealEstate } from "../realEstate.model";

export class RealEstateViewModel {
    constructor(realEstate: RealEstate){
        this.id = realEstate.id
        this.taxSubmissionId = realEstate.taxSubmissionId
        this.address = realEstate.address
        this.assessedValue = realEstate.assessedValue
        this.currency = realEstate.currency
    }

    @ApiProperty()
    id!: string
    @ApiProperty()
    taxSubmissionId!: number
    @ApiProperty()
    address!: string
    @ApiProperty()
    assessedValue!: number
    @ApiProperty()
    currency: string
}