import { ApiProperty } from "@nestjs/swagger";
import { Perk } from "../perk.model";

export class PerkViewModel {
    constructor(perk : Perk){
        this.id = perk.id
        this.taxSubmissionId = perk.taxSubmissionId
        this.amount = perk.amount
        this.currency = perk.currency
        this.description = perk.description
        this.type = perk.type
    }

    @ApiProperty()
    id: number;
    @ApiProperty()
    taxSubmissionId: number;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    currency: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    type: string;
}