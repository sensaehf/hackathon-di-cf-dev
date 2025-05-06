import { PartialType } from '@nestjs/swagger'
import { CreateReliabilityDto } from './create-reliability.dto'

export class UpdateReliabilityDto extends PartialType(CreateReliabilityDto) {}