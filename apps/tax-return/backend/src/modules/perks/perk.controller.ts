import { Controller, Get, Param } from '@nestjs/common'

import { PerkService } from './perk.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PerkViewModel } from './dto/perkViewModel.dto'
import { Perk } from './perk.model'
import { PerkResponse } from './dto/perkResponse'

@ApiTags('perks')
@Controller('v1/taxSubmissions/:taxSubmissionId/perks')
export class PerkController {
  constructor(private readonly perksService: PerkService) {}

  @ApiOkResponse({type: PerkResponse})
  @Get()
  async getById(@Param('taxSubmissionId') taxSubmissionId: number) {
    let perks : Perk[] | null = [];
    await this.perksService.findByTaxSubmissionId(taxSubmissionId)
    .then((e) =>
    {
      perks = e
    })
    
    return new PerkResponse(perks?.map(o => new PerkViewModel(o)) ?? []);
    
    
  }
}
