import { ApiProperty } from "@nestjs/swagger";
import { Subsidy } from "../subsidy.model";
import { IsNumber, IsString } from "class-validator";

export class SubsidyViewModel {
    constructor(sub : Subsidy){
        this.id = sub.id
        this.taxSubmissionId = sub.taxSubmissionId
        this.amount = sub.amount
        this.currency = sub.currency
        this.description = sub.description
        this.year = sub.year
        this.grantType = sub.grantType
        this.sourceName = sub.sourceName
    }

    @ApiProperty()
    id: number;
    @ApiProperty()
    taxSubmissionId: number;
    @ApiProperty()
    @IsNumber()
    amount: number;
    @ApiProperty()
    @IsString()
    currency: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    year: number;
    @ApiProperty()
    grantType: string;
    @ApiProperty()
    sourceName: string;
}