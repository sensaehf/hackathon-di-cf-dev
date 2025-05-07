import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator"
import { Type } from 'class-transformer'

export class CreateRealEstateDto {

    @ApiProperty()
    @IsString()
    @Type(() => String)
    id!: string

    @ApiProperty()
    @IsString()
    @Type(() => String)
    address!: string

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    assessedValue!: number

    @ApiProperty()
    @IsString()
    @Type(() => String)
    currency!: string
}