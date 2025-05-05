import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateConsentParams {
    @IsString()
    @Length(10, 10)
    @ApiProperty()
    readonly nationalId!: string
  }