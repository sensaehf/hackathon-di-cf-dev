import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaxSubmissionDto{
    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    personId!: number

    @ApiProperty()
    @IsNumber()
    @Type(() => Number)
    taxYear!: number
}