import { Controller, Get, Param } from '@nestjs/common'

import { SubsidyService } from './subsidy.service'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Subsidy } from './subsidy.model'
import { SubsidyResponse } from './dto/subsidyResponse';
import { SubsidyViewModel } from './dto/subsidyViewModel.dto';


@ApiTags('Subsidy work payments')
@Controller('v1/tax-submissions/:taxSubmissionId/subsidies')
export class SubsidyController {
  constructor(private readonly subsidyService: SubsidyService) {}

  @ApiOkResponse({type: SubsidyResponse})
  @Get()
  async getByTaxSubmissionId(@Param('taxSubmissionId')taxSubmissionId: number) {
    let subsidies : Subsidy[] | null = [];
    await this.subsidyService.findByTaxSubmissionId(taxSubmissionId)
    .then((e) =>
    {
      subsidies = e
    })
    
    return new SubsidyResponse(subsidies?.map(o => new SubsidyViewModel(o)) ?? []);
    
    
  }
}
