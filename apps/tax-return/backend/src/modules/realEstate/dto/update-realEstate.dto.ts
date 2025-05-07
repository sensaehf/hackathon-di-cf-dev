import { PartialType } from '@nestjs/swagger';
import { CreateRealEstateDto } from './create-realEstate.dto';

export class UpdateRealEstateDto extends PartialType(CreateRealEstateDto) {}