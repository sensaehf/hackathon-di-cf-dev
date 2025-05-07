import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateSubsidyDto{
    @ApiProperty()
    @IsNumber()
    amount!: number;
    @ApiProperty()
    @IsString()
    currency!: string;
    @ApiProperty()
    @IsString()
    description!: string;
    @ApiProperty()
    @IsNumber()
    year!: number;
    @ApiProperty()
    @IsString()
    grantType!: string;
    @ApiProperty()
    @IsString()
    sourceName!: string;
}