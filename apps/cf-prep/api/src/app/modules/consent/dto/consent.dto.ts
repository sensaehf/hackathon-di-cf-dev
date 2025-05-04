import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class ConsentDto {
  @ApiProperty()
  @IsString()
  @Length(10)
  readonly nationalId!: string
}
