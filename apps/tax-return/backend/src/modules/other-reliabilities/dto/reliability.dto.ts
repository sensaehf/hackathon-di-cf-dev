import { ApiProperty } from "@nestjs/swagger";
import { OtherReliabilities } from "../other-reliabilities.model";

export class OtherReliabilitiesViewModel {
    constructor(otherReliability: OtherReliabilities) {
        this.id = otherReliability.id;
        this.taxSubmissionId = otherReliability.taxSubmissionId;
        this.description = otherReliability.description;
        this.interestAmount = otherReliability.interestAmount;
        this.balance = otherReliability.balance;
        this.year = otherReliability.year;
        this.currency = otherReliability.currency;
    }

    @ApiProperty()
    id!: number;

    @ApiProperty()
    taxSubmissionId!: number;

    @ApiProperty()
    description!: string;

    @ApiProperty()
    interestAmount!: number;

    @ApiProperty()
    balance!: number;

    @ApiProperty()
    year!: number;

    @ApiProperty()
    currency!: string;
}