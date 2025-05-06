import { ApiProperty } from "@nestjs/swagger";

export class CreateTaxSubmissionDto{
    @ApiProperty()
    personId!: number

    @ApiProperty()
    taxYear!: number
}