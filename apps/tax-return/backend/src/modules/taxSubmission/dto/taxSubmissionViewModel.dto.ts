import { ApiProperty } from "@nestjs/swagger";
import { TaxSubmission } from "../taxSubmission.model";

export class TaxSubmissionViewModel {
    constructor(taxSubmission: TaxSubmission){
        this.id = taxSubmission.id
        this.personId = taxSubmission.personId
        this.taxYear = taxSubmission.taxYear
        this.createdAt = taxSubmission.createdAt
        this.submittedAt = taxSubmission.submittedAt
    }

    @ApiProperty()
    id!: number
    @ApiProperty()
    personId!: number
    @ApiProperty()
    taxYear!: number
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    submittedAt: Date
}

