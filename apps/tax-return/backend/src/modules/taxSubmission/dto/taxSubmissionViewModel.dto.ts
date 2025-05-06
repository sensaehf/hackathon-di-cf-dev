import { ApiProperty } from "@nestjs/swagger";
import { TaxSubmission } from "../taxSubmission.model";

export class TaxSubmissionViewModel {
    constructor(taxSubmisison: TaxSubmission){
        this.id = taxSubmisison.taxSubmissionId
        this.personId = taxSubmisison.personId
        this.taxYear = taxSubmisison.taxYear
        this.createdAt = taxSubmisison.createdAt
        this.submittedAt = taxSubmisison.submittedAt
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