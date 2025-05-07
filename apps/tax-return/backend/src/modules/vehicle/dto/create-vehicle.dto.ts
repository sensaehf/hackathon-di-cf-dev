import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateVehicleDto {
    @ApiProperty()
    @IsString()
    id!: string
    
    @ApiProperty()
    @IsString()
    currency!: string

    @ApiProperty()
    @IsNumber()
    purchasePrice!: number

    @ApiProperty()
    @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
    purchaseYear!: number
}