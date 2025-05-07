import { ApiProperty } from "@nestjs/swagger";

export class CreateVehicleDto {
    @ApiProperty()
    id!: string

    @ApiProperty()
    taxSubmissionId!: number
    
    @ApiProperty()
    currency!: string

    @ApiProperty()
    purchasePrice!: number

    @ApiProperty()
    purchaseYear!: number
}