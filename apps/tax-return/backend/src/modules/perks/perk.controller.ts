import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PerkService } from './perk.service';
import { Perk } from './perk.model';
import { PerkResponse } from './dto/perkResponse';
import { PerkViewModel } from './dto/perkViewModel.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePerkDto } from './dto/update-perk.dto';
import { CreatePerkDto } from './dto/create-perk.dto';

@ApiTags('Perks and per diems')
@Controller('v1/tax-submissions/:taxSubmissionId/perks')
export class PerkController {
  constructor(private readonly perkService: PerkService) {}

  @Post()
  create(@Param('taxSubmissionId') taxSubmissionId: number, @Body() createPerkDto: CreatePerkDto) {
    return this.perkService.create({ ...createPerkDto, taxSubmissionId });
  }

  @ApiOkResponse({type: PerkResponse})
  @Get()
  async getById(@Param('taxSubmissionId') taxSubmissionId: number) {
    let perks : Perk[] | null = [];
    await this.perkService.findByTaxSubmissionId(taxSubmissionId)
    .then((e) =>
    {
      perks = e
    })
    
    return new PerkResponse(perks?.map(o => new PerkViewModel(o)) ?? []);
    
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perkService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePerkDto: UpdatePerkDto) {
    return this.perkService.update(+id, updatePerkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perkService.remove(+id);
  }
}